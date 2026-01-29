import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listStores } from '../api/stores';
import type { StoreOut } from '../api/types';

export function StoresPage() {
  const [stores, setStores] = useState<StoreOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      const r = await listStores();
      if (!mounted) return;
      if (!r.ok) setError(r.error);
      else setStores(r.data);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Stores</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Browse active stores from the backend.
        </p>
      </div>

      {loading ? <div className="muted">Loading stores…</div> : null}
      {error ? (
        <div className="card" style={{ padding: 16 }}>
          <div style={{ fontWeight: 900 }}>Failed to load stores</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            {error}
          </div>
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        {stores.map((s) => (
          <Link
            key={s.id}
            to={`/stores/${s.id}`}
            className="card"
            style={{ gridColumn: 'span 4', padding: 14, display: 'grid', gap: 6 }}
          >
            <div style={{ fontWeight: 900 }}>{s.name}</div>
            <div className="muted" style={{ fontSize: 13 }}>
              {s.description ?? '—'}
            </div>
            <div style={{ marginTop: 8, fontWeight: 750, color: 'var(--primary)' }}>View store →</div>
          </Link>
        ))}
      </div>

      {!loading && !error && stores.length === 0 ? <div className="muted">No stores available.</div> : null}
    </div>
  );
}
