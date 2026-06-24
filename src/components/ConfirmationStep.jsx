import { useMemo } from 'react';

export function ConfirmationStep({ cart, onReturnToStore }) {
  const orderId = useMemo(
    () => 'AA-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    []
  );

  return (
    <div className="confirmation fade-in" style={{ width: '100%' }}>
      {/* Success Icon */}
      <div className="confirmation__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h1 className="confirmation__title">Acquisition Complete</h1>
      <p className="confirmation__subtitle">
        Your artifacts have been secured and are being prepared for shipment.
      </p>
      <p className="confirmation__order-id">Order {orderId}</p>

      <div className="confirmation__divider" />

      <p className="confirmation__message">
        Thank you for your patronage of the archives. A confirmation scroll has been dispatched
        to your email with the full details of your acquisition. We trust these pieces will
        enrich your personal collection for generations to come.
      </p>

      {/* Order items summary */}
      {cart.length > 0 && (
        <div
          style={{
            margin: '0 auto 2.5rem',
            maxWidth: '420px',
            border: '2px solid var(--sand-border)',
            padding: '1.5rem',
            background: 'rgba(255,255,255,0.8)',
            textAlign: 'left',
          }}
        >
          <h4
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 700,
              marginBottom: '1rem',
              color: 'var(--charcoal)',
            }}
          >
            Items Acquired
          </h4>
          {cart.map((item) => (
            <div
              key={item.product.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px dashed var(--sand-muted)',
                fontSize: '0.85rem',
              }}
            >
              <span style={{ color: 'var(--charcoal)' }}>
                {item.product.name} × {item.quantity}
              </span>
              <span style={{ fontWeight: 600 }}>
                ${(item.product.numericPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        className="btn-gold"
        onClick={onReturnToStore}
        style={{ maxWidth: '320px', margin: '0 auto' }}
        id="return-to-store"
      >
        Return to the Archives
      </button>
    </div>
  );
}
