import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../state/cart';

const demoProducts = [
  { id: 'p1', name: 'Everyday Backpack', price: 59.99 },
  { id: 'p2', name: 'Insulated Bottle', price: 24.5 },
  { id: 'p3', name: 'Trail Sneakers', price: 89.0 },
];

export function StoreDetailPage() {
  const { storeId } = useParams();
  const cart = useCart();

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>Store: {storeId}</h1>
          <p className="muted" style={{ margin: '6px 0 0' }}>
            Placeholder store page with demo products.
          </p>
        </div>
        <Link to="/stores" className="btn">
          Back to Stores
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        {demoProducts.map((p) => (
          <div key={p.id} className="card" style={{ gridColumn: 'span 4', padding: 14, display: 'grid', gap: 10 }}>
            <div>
              <div style={{ fontWeight: 900 }}>{p.name}</div>
              <div className="muted" style={{ fontSize: 13 }}>
                ${p.price.toFixed(2)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link className="btn" to={`/products/${p.id}`}>
                View
              </Link>
              <button
                className="btn btn-primary"
                onClick={() => cart.addItem({ id: p.id, name: p.name, price: p.price, storeId: storeId ?? 'unknown' }, 1)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
