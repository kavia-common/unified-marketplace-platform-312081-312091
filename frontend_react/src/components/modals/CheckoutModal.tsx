import React, { useState } from 'react';
import { Modal } from './Modal';
import { checkoutCart } from '../../api/cart';
import { useSession } from '../../state/session';

export function CheckoutModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const { token } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function placeOrder() {
    if (!token) {
      setError('Please login before checking out.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const r = await checkoutCart();
      if (!r.ok) {
        setError(r.error);
        return;
      }
      onConfirm();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      title="Checkout"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose} disabled={loading}>
            Back
          </button>
          <button className="btn btn-primary" onClick={placeOrder} disabled={loading || !token}>
            {loading ? 'Placing order…' : 'Place order'}
          </button>
        </>
      }
    >
      <div style={{ display: 'grid', gap: 10 }}>
        <div style={{ fontWeight: 800 }}>Payment & Shipping (mock)</div>
        <div className="muted" style={{ fontSize: 13 }}>
          This uses <code>POST /api/orders</code> to create an order from your cart and clear it on the server.
        </div>

        {error ? (
          <div className="muted" style={{ fontSize: 13, color: 'var(--danger)' }}>
            {error}
          </div>
        ) : null}

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Address</div>
          <input className="input" placeholder="123 Market St, City, Country" />
        </div>

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Payment</div>
          <input className="input" placeholder="Card details (mock)" />
        </div>
      </div>
    </Modal>
  );
}
