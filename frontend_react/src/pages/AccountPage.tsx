import React from 'react';
import { useSession } from '../state/session';

export function AccountPage() {
  const { role, setRole } = useSession();

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 20 }}>Account</h1>
        <p className="muted" style={{ margin: '6px 0 0' }}>
          Placeholder account page. Use the Login button in the header to change roles.
        </p>
      </div>

      <div className="card" style={{ padding: 16, display: 'grid', gap: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900 }}>Current role</div>
            <div className="muted" style={{ fontSize: 13 }}>
              {role}
            </div>
          </div>
          <button className="btn" onClick={() => setRole('customer')}>
            Reset to customer
          </button>
        </div>

        <div className="divider" />
        <div className="muted" style={{ fontSize: 13 }}>
          Future: profile, addresses, payment methods, notifications, subscriptions.
        </div>
      </div>
    </div>
  );
}
