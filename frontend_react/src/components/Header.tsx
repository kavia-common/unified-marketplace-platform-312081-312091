import React from 'react';
import { NavLink } from 'react-router-dom';

type Role = 'customer' | 'vendor' | 'admin';

function navLinkStyle({ isActive }: { isActive: boolean }): React.CSSProperties {
  return {
    padding: '10px 12px',
    borderRadius: 10,
    background: isActive ? 'rgba(59, 130, 246, 0.10)' : 'transparent',
    color: isActive ? 'var(--primary)' : 'var(--text)',
    fontWeight: 650,
  };
}

export function Header({
  role,
  cartCount,
  onOpenCart,
  onOpenLogin,
}: {
  role: Role;
  cartCount: number;
  onOpenCart: () => void;
  onOpenLogin: () => void;
}) {
  return (
    <header
      style={{
        height: 'var(--header-h)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, rgba(59,130,246,1), rgba(6,182,212,1))',
              boxShadow: 'var(--shadow-sm)',
            }}
            aria-hidden="true"
          />
          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800 }}>Unified Marketplace</div>
            <div className="muted" style={{ fontSize: 12 }}>
              Role: <span style={{ fontWeight: 700 }}>{role}</span>
            </div>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <NavLink to="/" style={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/stores" style={navLinkStyle}>
            Stores
          </NavLink>

          <button className="btn" onClick={onOpenCart} style={{ position: 'relative' }}>
            Cart {cartCount > 0 ? <span className="badge" style={{ marginLeft: 8 }}>{cartCount}</span> : null}
          </button>

          <NavLink to="/account" style={navLinkStyle}>
            Account
          </NavLink>

          <button className="btn btn-primary" onClick={onOpenLogin}>
            Login
          </button>
        </nav>
      </div>
    </header>
  );
}
