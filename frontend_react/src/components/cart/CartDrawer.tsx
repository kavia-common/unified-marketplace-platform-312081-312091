import React from 'react';
import type { CartItem } from '../../state/cart';

export function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
  onUpdateQty,
  onCheckout,
}: {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <>
      <div
        onMouseDown={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: open ? 'rgba(17,24,39,0.35)' : 'transparent',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'background 160ms ease',
          zIndex: 40,
        }}
      />
      <aside
        aria-label="Cart drawer"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100vh',
          width: 'min(420px, 92vw)',
          background: 'var(--surface)',
          borderLeft: '1px solid var(--border)',
          boxShadow: 'var(--shadow-md)',
          transform: open ? 'translateX(0)' : 'translateX(102%)',
          transition: 'transform 180ms ease',
          zIndex: 50,
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
        }}
      >
        <div style={{ padding: 16, borderBottom: '1px solid var(--border)', display: 'flex', gap: 10 }}>
          <div style={{ fontWeight: 900, fontSize: 16 }}>Your Cart</div>
          <div style={{ flex: 1 }} />
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>

        <div style={{ padding: 16, overflow: 'auto' }}>
          {items.length === 0 ? (
            <div className="muted">Cart is empty. Add items from Stores.</div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {items.map((it) => (
                <div key={it.id} className="card" style={{ padding: 12, display: 'grid', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ fontWeight: 850 }}>{it.name}</div>
                    <button className="btn btn-danger" onClick={() => onRemove(it.id)}>
                      Remove
                    </button>
                  </div>

                  <div className="muted" style={{ fontSize: 13 }}>
                    ${it.price.toFixed(2)}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button className="btn" onClick={() => onUpdateQty(it.id, Math.max(1, it.qty - 1))}>
                      -
                    </button>
                    <div style={{ minWidth: 28, textAlign: 'center', fontWeight: 800 }}>{it.qty}</div>
                    <button className="btn" onClick={() => onUpdateQty(it.id, it.qty + 1)}>
                      +
                    </button>
                    <div style={{ flex: 1 }} />
                    <div style={{ fontWeight: 900 }}>${(it.qty * it.price).toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: 16, borderTop: '1px solid var(--border)', display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900 }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary" onClick={onCheckout} disabled={items.length === 0}>
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
