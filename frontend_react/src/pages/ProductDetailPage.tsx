import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../state/cart';

export function ProductDetailPage() {
  const { productId } = useParams();
  const cart = useCart();

  const price = 49.99;

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div className="card" style={{ padding: 16 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>Product: {productId}</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Placeholder product detail page.
        </p>

        <div className="divider" style={{ margin: '12px 0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="card" style={{ padding: 14, borderStyle: 'dashed' }}>
            <div className="muted">Image placeholder</div>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>${price.toFixed(2)}</div>
            <div className="muted" style={{ fontSize: 13 }}>
              Future: variants, inventory, reviews, recommendations.
            </div>
            <button
              className="btn btn-primary"
              onClick={() => cart.addItem({ id: productId ?? 'unknown', name: `Product ${productId}`, price, storeId: 's1' })}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
