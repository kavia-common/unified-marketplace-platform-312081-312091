import React from 'react';

export function OrdersPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Orders</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Placeholder order history and tracking page.
        </p>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900 }}>No orders yet</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
          Once backend endpoints are implemented, this page will list multi-vendor orders and statuses.
        </div>
      </div>
    </div>
  );
}
