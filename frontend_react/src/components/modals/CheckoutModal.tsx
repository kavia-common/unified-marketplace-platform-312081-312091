import React from 'react';
import { Modal } from './Modal';

export function CheckoutModal({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal
      open={open}
      title="Checkout"
      onClose={onClose}
      footer={
        <>
          <button className="btn" onClick={onClose}>
            Back
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Place order (stub)
          </button>
        </>
      }
    >
      <div style={{ display: 'grid', gap: 10 }}>
        <div style={{ fontWeight: 800 }}>Payment & Shipping (placeholder)</div>
        <div className="muted" style={{ fontSize: 13 }}>
          This modal will be wired to real checkout endpoints later. For now it clears the cart.
        </div>

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Address</div>
          <input className="input" placeholder="123 Market St, City, Country" />
        </div>

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>Payment</div>
          <input className="input" placeholder="Card details (stub)" />
        </div>
      </div>
    </Modal>
  );
}
