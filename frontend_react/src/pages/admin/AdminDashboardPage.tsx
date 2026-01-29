import React from 'react';

export function AdminDashboardPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Admin Dashboard</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Placeholder admin analytics and platform controls.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div className="card" style={{ gridColumn: 'span 3', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Vendors
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>18</div>
        </div>
        <div className="card" style={{ gridColumn: 'span 3', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Customers
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>2,140</div>
        </div>
        <div className="card" style={{ gridColumn: 'span 3', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Orders (30d)
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>5,320</div>
        </div>
        <div className="card" style={{ gridColumn: 'span 3', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            GMV (30d)
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>$98k</div>
        </div>
      </div>
    </div>
  );
}
