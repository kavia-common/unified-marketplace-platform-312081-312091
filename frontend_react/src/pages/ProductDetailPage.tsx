import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/products';
import type { ProductOut } from '../api/types';
import { useCart } from '../state/cart';
import { useSession } from '../state/session';

export function ProductDetailPage() {
  const { productId } = useParams();
  const cart = useCart();
  const { token } = useSession();

  const [product, setProduct] = useState<ProductOut | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const price = useMemo(() => {
    if (!product) return 0;
    return typeof product.price === 'string' ? Number(product.price) : product.price;
  }, [product]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!productId) return;
      setLoading(true);
      setError(null);
      const r = await getProductById(productId);
      if (!mounted) return;
      if (!r.ok) setError(r.error);
      else setProduct(r.data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [productId]);

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div className="card" style={{ padding: 16 }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>{product ? product.name : `Product: ${productId}`}</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          {product?.description ?? 'Product details loaded from backend.'}
        </p>

        <div className="divider" style={{ margin: '12px 0' }} />

        {loading ? <div className="muted">Loading product…</div> : null}
        {error ? (
          <div className="muted" style={{ fontSize: 13 }}>
            Failed to load product: {error}
          </div>
        ) : null}

        {product ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div className="card" style={{ padding: 14, borderStyle: 'dashed' }}>
              <div className="muted">Image placeholder</div>
              {product.image_url ? (
                <div className="muted" style={{ marginTop: 8, fontSize: 12 }}>
                  image_url: {product.image_url}
                </div>
              ) : null}
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              <div style={{ fontWeight: 900, fontSize: 18 }}>
                ${price.toFixed(2)} {product.currency}
              </div>
              <div className="muted" style={{ fontSize: 13 }}>
                Inventory: {product.inventory_qty}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => cart.addItem({ productId: product.id, name: product.name, price, storeId: product.store_id }, 1)}
                disabled={!token}
                title={!token ? 'Login required to use cart' : undefined}
              >
                Add to cart
              </button>

              {!token ? (
                <div className="muted" style={{ fontSize: 12 }}>
                  Please login to add items to cart.
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
