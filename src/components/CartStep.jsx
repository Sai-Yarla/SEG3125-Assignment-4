export function CartStep({ cart, onUpdateQuantity, onRemove, onProceed, onContinueShopping }) {
  if (cart.length === 0) {
    return (
      <div className="form-panel fade-in" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            color: 'var(--charcoal)',
            marginBottom: '0.75rem',
          }}
        >
          Your Collection is Empty
        </h3>
        <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Begin your expedition through our archives to discover remarkable artifacts.
        </p>
        <button className="btn-gold" onClick={onContinueShopping} style={{ maxWidth: '280px', margin: '0 auto' }}>
          Explore the Archives
        </button>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="form-panel">
        {cart.map((item) => (
          <div key={item.product.id} className="cart-item" id={`cart-item-${item.product.id}`}>
            <div className="cart-item__image">
              <img src={item.product.imageUrl} alt={item.product.name} />
            </div>
            <div className="cart-item__info">
              <h4 className="cart-item__name">{item.product.name}</h4>
              <span className="cart-item__era">{item.product.era}</span>
            </div>
            <div className="cart-item__qty">
              <button
                className="cart-item__qty-btn"
                onClick={() => onUpdateQuantity(item.product.id, -1)}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="cart-item__qty-value">{item.quantity}</span>
              <button
                className="cart-item__qty-btn"
                onClick={() => onUpdateQuantity(item.product.id, 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="cart-item__price">
              ${(item.product.numericPrice * item.quantity).toFixed(2)}
            </span>
            <button
              className="cart-item__remove"
              onClick={() => onRemove(item.product.id)}
              aria-label={`Remove ${item.product.name}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button className="btn-outline" onClick={onContinueShopping} style={{ flex: 1 }}>
          Continue Exploring
        </button>
        <button className="btn-gold" onClick={onProceed} style={{ flex: 1, marginTop: 0 }} id="proceed-to-details">
          Proceed to Details
        </button>
      </div>
    </div>
  );
}
