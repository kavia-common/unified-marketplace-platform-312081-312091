import React from 'react';

export function VendorProductsPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>Vendor Products</h1>
          <p className="muted" style={{ margin: '6px 0 0' }}>
            Product CRUD requires vendor-scoped create/update endpoints.
          </p>
        </div>
        <button className="btn btn-primary" disabled title="TODO: backend endpoint not implemented">
          Add product (TODO)
        </button>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900 }}>TODO</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
          The current backend exposes public product listing and details only:
          <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
            <li>GET /api/products</li>
            <li>GET /api/products/{'{id}'}</li>
          </ul>
          Add vendor endpoints (create/update) to enable this page.
        </div>
      </div>
    </div>
  );
}
