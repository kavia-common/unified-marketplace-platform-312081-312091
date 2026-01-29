import React from 'react';
import { Link } from 'react-router-dom';

const demoStores = [
  { id: 's1', name: 'Bluewave Outfitters', tagline: 'Outdoor gear & essentials' },
  { id: 's2', name: 'Cyan Kitchen', tagline: 'Modern cookware and tools' },
  { id: 's3', name: 'Slate Books', tagline: 'Curated reads & stationery' },
];

export function StoresPage() {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Stores</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Placeholder store directory.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
        {demoStores.map((s) => (
          <Link
            key={s.id}
            to={`/stores/${s.id}`}
            className="card"
            style={{ gridColumn: 'span 4', padding: 14, display: 'grid', gap: 6 }}
          >
            <div style={{ fontWeight: 900 }}>{s.name}</div>
            <div className="muted" style={{ fontSize: 13 }}>
              {s.tagline}
            </div>
            <div style={{ marginTop: 8, fontWeight: 750, color: 'var(--primary)' }}>View store →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
