import React from 'react';

export function VendorProductsPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>Vendor Products</h1>
          <p className="muted" style={{ margin: '6px 0 0' }}>
            Placeholder product CRUD page.
          </p>
        </div>
        <button className="btn btn-primary">Add product (stub)</button>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div style={{ fontWeight: 900 }}>No products loaded</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
          Later this page will call vendor product endpoints and support editing, inventory, images.
        </div>
      </div>
    </div>
  );
}
