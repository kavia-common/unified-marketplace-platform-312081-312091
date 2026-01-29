import React from 'react';

export function AdminVendorsPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>Vendors</h1>
          <p className="muted" style={{ margin: '6px 0 0' }}>
            Vendor management requires admin-scoped endpoints (not available yet).
          </p>
        </div>
        <button className="btn" disabled title="TODO: backend endpoint not implemented">
          Invite vendor (TODO)
        </button>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900 }}>TODO</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
          Add admin endpoints to list/manage vendors (approval, stores, payouts, compliance) to power this page.
        </div>
      </div>
    </div>
  );
}
