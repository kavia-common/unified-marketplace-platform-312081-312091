import React, { useEffect, useMemo, useState } from 'react';
import { listOrders } from '../../api/orders';
import type { OrderOut } from '../../api/types';
import { useSession } from '../../state/session';

export function AdminDashboardPage() {
  const { token, role } = useSession();
  const [orders, setOrders] = useState<OrderOut[]>([]);
  const [loading, setLoading] = useState(false);

  const orders30d = useMemo(() => orders.length, [orders]);

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
        <h1 style={{ margin: 0, fontSize: 20 }}>Admin Dashboard</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Minimal admin overview. Order listing uses /api/orders (admin sees all).
        </p>
      </div>

      {role !== 'admin' ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Not an admin</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Switch to an admin account to see platform-wide data.
          </div>
        </div>
      ) : null}

      {!token ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Login required</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Please login as an admin.
          </div>
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div className="card" style={{ gridColumn: 'span 3', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Vendors
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>—</div>
          <div className="muted" style={{ fontSize: 13 }}>
            TODO: add admin vendors endpoint
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 3', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Customers
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>—</div>
          <div className="muted" style={{ fontSize: 13 }}>
            TODO: add admin users endpoint
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 3', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Orders (visible)
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>{loading ? '…' : orders30d}</div>
          <div className="muted" style={{ fontSize: 13 }}>
            From /api/orders
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 3', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            GMV
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>$—</div>
          <div className="muted" style={{ fontSize: 13 }}>
            TODO: add analytics endpoint
          </div>
        </div>
      </div>
    </div>
  );
}
