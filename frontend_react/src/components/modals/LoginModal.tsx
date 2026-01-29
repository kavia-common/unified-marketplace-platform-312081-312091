import React, { useState } from 'react';
import { Modal } from './Modal';

type Role = 'customer' | 'vendor' | 'admin';

export function LoginModal({
  open,
  onClose,
  onLogin,
}: {
  open: boolean;
  onClose: () => void;
  onLogin: (role: Role) => void;
}) {
  const [role, setRole] = useState<Role>('customer');

  return (
    <Modal
      open={open}
      title="Login"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => onLogin(role)}>
            Continue
          </button>
        </>
      }
    >
      <div style={{ display: 'grid', gap: 10 }}>
        <div className="muted" style={{ fontSize: 13 }}>
          This is a placeholder login. Choose a role to see role-based navigation.
        </div>

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Role</span>
          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            aria-label="Select role"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Email</span>
          <input className="input" placeholder="you@example.com" />
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Password</span>
          <input className="input" placeholder="••••••••" type="password" />
        </label>
      </div>
    </Modal>
  );
}
