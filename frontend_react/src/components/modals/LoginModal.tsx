import React, { useMemo, useState } from 'react';
import { Modal } from './Modal';
import { login as apiLogin, fetchMe } from '../../api/auth';
import { sessionStore } from '../../state/session';

export function LoginModal({
  open,
  onClose,
  onLoggedIn,
}: {
  open: boolean;
  onClose: () => void;
  onLoggedIn: () => void;
}) {
  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => email.trim().length > 3 && password.trim().length >= 6 && !loading, [email, password, loading]);

  async function onSubmit() {
    setError(null);
    setLoading(true);
    try {
      const r = await apiLogin(email.trim(), password);
      if (!r.ok) {
        setError(r.error);
        return;
      }

      sessionStore.setToken(r.data.access_token);

      const me = await fetchMe();
      if (!me.ok) {
        // Token stored, but /me failed; keep token and force re-login if needed.
        setError(me.error);
        return;
      }
      sessionStore.setUser(me.data);

      onLoggedIn();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      title="Login"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onSubmit} disabled={!canSubmit}>
            {loading ? 'Signing in…' : 'Continue'}
          </button>
        </>
      }
    >
      <div style={{ display: 'grid', gap: 10 }}>
        <div className="muted" style={{ fontSize: 13 }}>
          Demo backend auth: use seeded accounts (e.g., <code>customer@example.com</code> / <code>password123</code>).
        </div>

        {error ? (
          <div className="card" style={{ padding: 12, borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.06)' }}>
            <div style={{ fontWeight: 900, color: 'var(--danger)' }}>Login failed</div>
            <div className="muted" style={{ marginTop: 4, fontSize: 13 }}>
              {error}
            </div>
          </div>
        ) : null}

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Email</span>
          <input className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Password</span>
          <input className="input" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <div className="muted" style={{ fontSize: 12 }}>
          Role is derived from the backend user profile (<code>/api/me</code>) after login.
        </div>
      </div>
    </Modal>
  );
}
