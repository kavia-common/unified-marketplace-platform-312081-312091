import React from 'react';
import { NavLink } from 'react-router-dom';

type Role = 'customer' | 'vendor' | 'admin';

function linkStyle({ isActive }: { isActive: boolean }): React.CSSProperties {
  return {
    display: 'block',
    padding: '10px 12px',
    borderRadius: 10,
    border: `1px solid ${isActive ? 'rgba(59,130,246,0.35)' : 'transparent'}`,
    background: isActive ? 'rgba(59,130,246,0.08)' : 'transparent',
    color: isActive ? 'var(--primary)' : 'var(--text)',
    fontWeight: 650,
  };
}

export function Sidebar({ role }: { role: Role }) {
  const vendorLinks = [
    { to: '/vendor', label: 'Vendor Dashboard' },
    { to: '/vendor/products', label: 'Products' },
    { to: '/vendor/orders', label: 'Orders' },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Dashboard' },
    { to: '/admin/vendors', label: 'Vendors' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'vendor' ? vendorLinks : [];

  return (
    <aside className="card" style={{ padding: 12 }}>
      <div style={{ padding: '6px 8px 10px', fontWeight: 800 }}>Workspace</div>
      <div className="divider" style={{ margin: '6px 0 12px' }} />
      <div style={{ display: 'grid', gap: 6 }}>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} style={linkStyle}>
            {l.label}
          </NavLink>
        ))}
      </div>

      <div className="divider" style={{ margin: '14px 0 10px' }} />
      <div className="muted" style={{ fontSize: 12, padding: '0 8px 6px' }}>
        Placeholder navigation for role-based dashboards.
      </div>
    </aside>
  );
}
