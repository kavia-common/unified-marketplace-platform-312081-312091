import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchHealth } from '../api/health';
import { listStores } from '../api/stores';
import { listProducts } from '../api/products';
import type { ProductOut, StoreOut } from '../api/types';

export function HomePage() {
  const [health, setHealth] = useState<string>('Loading…');
  const [stores, setStores] = useState<StoreOut[]>([]);
  const [products, setProducts] = useState<ProductOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const featuredStores = useMemo(() => stores.slice(0, 3), [stores]);
  const featuredProducts = useMemo(() => products.slice(0, 6), [products]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);

      const h = await fetchHealth();
      if (!mounted) return;
      setHealth(h.ok ? `OK (${h.data.message})` : `Unavailable (${h.error})`);

      const [s, p] = await Promise.all([listStores(), listProducts()]);
      if (!mounted) return;

      if (!s.ok) setError(s.error);
      else setStores(s.data);

      if (!p.ok) setError((prev) => prev ?? p.error);
      else setProducts(p.data);

      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div className="card" style={{ padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, letterSpacing: -0.3 }}>Discover stores and products</h1>
            <p className="muted" style={{ margin: '6px 0 0' }}>
              Browse stores, add items to a server-side cart, and checkout to create an order.
            </p>
          </div>
          <div className="badge">Backend: {health}</div>
        </div>

        <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/stores" className="btn btn-primary">
            Browse Stores
          </Link>
          <Link to="/orders" className="btn">
            View Orders
          </Link>
          <Link to="/account" className="btn">
            Account
          </Link>
        </div>

        {error ? (
          <div className="muted" style={{ marginTop: 12, fontSize: 13 }}>
            Error loading data: {error}
          </div>
        ) : null}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div className="card" style={{ gridColumn: 'span 6', padding: 16 }}>
          <div style={{ fontWeight: 900, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <span>Featured stores</span>
            <Link to="/stores" className="muted" style={{ fontSize: 13, fontWeight: 700 }}>
              View all →
            </Link>
          </div>

          <div style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {loading ? (
              <div className="muted">Loading stores…</div>
            ) : featuredStores.length === 0 ? (
              <div className="muted">No stores available yet.</div>
            ) : (
              featuredStores.map((s) => (
                <Link key={s.id} to={`/stores/${s.id}`} className="card" style={{ padding: 12 }}>
                  <div style={{ fontWeight: 900 }}>{s.name}</div>
                  <div className="muted" style={{ marginTop: 4, fontSize: 13 }}>
                    {s.description ?? '—'}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="card" style={{ gridColumn: 'span 6', padding: 16 }}>
          <div style={{ fontWeight: 900, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
            <span>Featured products</span>
            <Link to="/stores" className="muted" style={{ fontSize: 13, fontWeight: 700 }}>
              Browse →
            </Link>
          </div>

          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 10 }}>
            {loading ? (
              <div className="muted" style={{ gridColumn: 'span 12' }}>
                Loading products…
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="muted" style={{ gridColumn: 'span 12' }}>
                No products available yet.
              </div>
            ) : (
              featuredProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="card"
                  style={{ gridColumn: 'span 6', padding: 12, display: 'grid', gap: 6 }}
                >
                  <div style={{ fontWeight: 900 }}>{p.name}</div>
                  <div className="muted" style={{ fontSize: 13 }}>
                    {(typeof p.price === 'string' ? Number(p.price) : p.price).toFixed(2)} {p.currency}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
