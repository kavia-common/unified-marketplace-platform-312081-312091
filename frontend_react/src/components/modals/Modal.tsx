import React, { useEffect } from 'react';

export function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17,24,39,0.45)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 60,
      }}
    >
      <div
        className="card"
        onMouseDown={(e) => e.stopPropagation()}
        style={{
          width: 'min(520px, 100%)',
          padding: 16,
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
            <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
              Demo modal (stub)
            </div>
          </div>
          <button className="btn" onClick={onClose} aria-label="Close">
            Close
          </button>
        </div>

        <div className="divider" style={{ margin: '12px 0' }} />
        <div>{children}</div>

        {footer ? (
          <>
            <div className="divider" style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>{footer}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}
