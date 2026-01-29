import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStoreById } from '../api/stores';
import { listProducts } from '../api/products';
import type { ProductOut, StoreOut } from '../api/types';
import { useCart } from '../state/cart';
import { useSession } from '../state/session';

export function StoreDetailPage() {
  const { storeId } = useParams();
  const cart = useCart();
  const { token } = useSession();

  const [store, setStore] = useState<StoreOut | null>(null);
  const [products, setProducts] = useState<ProductOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const storeIdSafe = storeId ?? '';
  const storeName = useMemo(() => store?.name ?? `Store: ${storeId}`, [store, storeId]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!storeId) return;
      setLoading(true);
      setError(null);

      const [s, p] = await Promise.all([getStoreById(storeId), listProducts({ storeId })]);
      if (!mounted) return;

      if (!s.ok) setError(s.error);
      else setStore(s.data);

      if (!p.ok) setError((prev) => prev ?? p.error);
      else setProducts(p.data);

      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [storeId]);

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20 }}>{storeName}</h1>
          <p className="muted" style={{ margin: '6px 0 0' }}>
            {store?.description ?? 'Browse store products.'}
          </p>
        </div>
        <Link to="/stores" className="btn">
          Back to Stores
        </Link>
      </div>

      {loading ? <div className="muted">Loading store…</div> : null}
      {error ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Failed to load store</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            {error}
          </div>
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        {products.map((p) => {
          const price = typeof p.price === 'string' ? Number(p.price) : p.price;
          return (
            <div key={p.id} className="card" style={{ gridColumn: 'span 4', padding: 14, display: 'grid', gap: 10 }}>
              <div>
                <div style={{ fontWeight: 900 }}>{p.name}</div>
                <div className="muted" style={{ fontSize: 13 }}>
                  {price.toFixed(2)} {p.currency}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link className="btn" to={`/products/${p.id}`}>
                  View
                </Link>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    cart.addItem({ productId: p.id, name: p.name, price, storeId: p.store_id }, 1)
                  }
                  disabled={!token}
                  title={!token ? 'Login required to use cart' : undefined}
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!loading && !error && products.length === 0 ? <div className="muted">No products available in this store.</div> : null}

      {!token ? (
        <div className="muted" style={{ marginTop: 8, fontSize: 13 }}>
          Note: cart actions require login (JWT).
        </div>
      ) : null}
    </div>
  );
}
