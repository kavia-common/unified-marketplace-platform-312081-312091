import React, { useEffect, useMemo, useState } from 'react';
import { listOrders } from '../../api/orders';
import { useSession } from '../../state/session';
import type { OrderOut } from '../../api/types';

export function VendorDashboardPage() {
  const { token, role } = useSession();
  const [orders, setOrders] = useState<OrderOut[]>([]);
  const [loading, setLoading] = useState(false);

  const ordersCount = useMemo(() => orders.length, [orders]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!token) return;
      setLoading(true);
      const r = await listOrders();
      if (!mounted) return;
      if (r.ok) setOrders(r.data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Vendor Dashboard</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Lightweight vendor overview powered by backend order listing.
        </p>
      </div>

      {role !== 'vendor' ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Not a vendor</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Switch to a vendor account to see vendor data.
          </div>
        </div>
      ) : null}

      {!token ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Login required</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Please login as a vendor.
          </div>
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div className="card" style={{ gridColumn: 'span 4', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Orders (visible)
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>{loading ? '…' : ordersCount}</div>
          <div className="muted" style={{ fontSize: 13 }}>
            From /api/orders (vendor scoped)
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 4', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Revenue
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>$—</div>
          <div className="muted" style={{ fontSize: 13 }}>
            TODO: add analytics endpoint
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 4', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Rating
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>—</div>
          <div className="muted" style={{ fontSize: 13 }}>
            TODO: add reviews endpoint
          </div>
        </div>
      </div>
    </div>
  );
}
