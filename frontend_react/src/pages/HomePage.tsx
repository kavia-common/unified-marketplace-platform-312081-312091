import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchHealth } from '../api/health';

export function HomePage() {
  const [health, setHealth] = useState<string>('Loading…');

  useEffect(() => {
    let mounted = true;
    fetchHealth().then((r) => {
      if (!mounted) return;
      setHealth(r.ok ? 'OK (connected)' : `Unavailable (${r.error})`);
    });
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
              Minimal marketplace scaffold: browse stores, add to cart, and checkout via modal.
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
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        <div className="card" style={{ gridColumn: 'span 6', padding: 16 }}>
          <div style={{ fontWeight: 900 }}>For customers</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Browse stores and products; add items to a multi-store cart; checkout via modal (stub).
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 6', padding: 16 }}>
          <div style={{ fontWeight: 900 }}>For vendors/admins</div>
          <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
            Use Login modal to switch role and see role-based sidebars and dashboard placeholder pages.
          </div>
        </div>
      </div>
    </div>
  );
}
