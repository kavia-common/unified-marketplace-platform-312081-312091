import React, { useEffect, useMemo, useState } from 'react';
import { listOrders } from '../api/orders';
import type { OrderOut } from '../api/types';
import { useSession } from '../state/session';

export function OrdersPage() {
  const { token, role } = useSession();
  const [orders, setOrders] = useState<OrderOut[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtitle = useMemo(() => {
    if (role === 'vendor') return 'Orders that contain items from your stores.';
    if (role === 'admin') return 'All platform orders.';
    return 'Your order history.';
  }, [role]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!token) return;
      setLoading(true);
      setError(null);
      const r = await listOrders();
      if (!mounted) return;
      if (!r.ok) setError(r.error);
      else setOrders(r.data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Orders</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          {subtitle}
        </p>
      </div>

      {!token ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Login required</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Please login to view orders.
          </div>
        </div>
      ) : null}

      {token && loading ? <div className="muted">Loading orders…</div> : null}

      {token && error ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Failed to load orders</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            {error}
          </div>
        </div>
      ) : null}

      {token && !loading && !error && orders.length === 0 ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>No orders yet</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Checkout your cart to create an order.
          </div>
        </div>
      ) : null}

      {token && orders.length > 0 ? (
        <div style={{ display: 'grid', gap: 10 }}>
          {orders.map((o) => (
            <div key={o.id} className="card" style={{ padding: 14, display: 'grid', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ fontWeight: 900 }}>Order {o.id.slice(0, 8)}…</div>
                <div className="badge">{o.status}</div>
              </div>
              <div className="muted" style={{ fontSize: 13 }}>
                Items: {o.items.length} • Total: ${(typeof o.total === 'string' ? Number(o.total) : o.total).toFixed(2)} {o.currency}
              </div>
              <div className="muted" style={{ fontSize: 12 }}>
                Created: {new Date(o.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
