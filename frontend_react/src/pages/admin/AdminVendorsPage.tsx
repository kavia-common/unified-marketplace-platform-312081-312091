import React from 'react';

export function AdminVendorsPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>Vendors</h1>
          <p className="muted" style={{ margin: '6px 0 0' }}>
            Placeholder vendor approvals and management.
          </p>
        </div>
        <button className="btn">Invite vendor (stub)</button>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900 }}>No vendor data loaded</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
          Later this page will list vendor accounts, status, stores, payouts, and compliance checks.
        </div>
      </div>
    </div>
  );
}
