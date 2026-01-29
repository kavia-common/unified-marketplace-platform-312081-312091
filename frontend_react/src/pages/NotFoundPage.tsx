import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18 }}>Page not found</div>
      <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
        The page you requested does not exist.
      </div>
      <div style={{ marginTop: 12 }}>
        <Link className="btn btn-primary" to="/">
          Go Home
        </Link>
      </div>
    </div>
  );
}
