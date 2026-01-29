import React from 'react';

export function VendorOrdersPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Vendor Orders</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Placeholder for vendor-specific orders and fulfillment actions.
        </p>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900 }}>No orders loaded</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
          Later: accept/ship orders, refunds, messaging, status updates.
        </div>
      </div>
    </div>
  );
}
