import React from 'react';

export function VendorDashboardPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Vendor Dashboard</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Placeholder vendor analytics and store management overview.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div className="card" style={{ gridColumn: 'span 4', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Today
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>12</div>
          <div className="muted" style={{ fontSize: 13 }}>
            Orders
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 4', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Revenue
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>$1,204</div>
          <div className="muted" style={{ fontSize: 13 }}>
            (demo)
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 4', padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>
            Rating
          </div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>4.8</div>
          <div className="muted" style={{ fontSize: 13 }}>
            Reviews
          </div>
        </div>
      </div>
    </div>
  );
}
