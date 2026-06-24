export function OrderSummary({ cart }) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.numericPrice * item.quantity,
    0
  );

  // Check if any item is Numismatics for the 15% discount
  const numismaticsTotal = cart
    .filter((item) => item.product.category === 'Numismatics')
    .reduce((sum, item) => sum + item.product.numericPrice * item.quantity, 0);

  const discount = numismaticsTotal * 0.15;
  const shipping = subtotal > 0 ? 25 : 0;
  const total = subtotal - discount + shipping;

  return (
    <aside className="order-summary" id="order-summary">
      <div className="order-summary__panel">
        <h3 className="order-summary__title">Archive Summary</h3>

        {/* Items */}
        <div className="order-summary__items">
          {cart.map((item) => (
            <div key={item.product.id} className="order-summary__item">
              <div className="order-summary__item-image">
                <img src={item.product.imageUrl} alt={item.product.name} />
              </div>
              <div className="order-summary__item-info">
                <h4 className="order-summary__item-name">{item.product.name}</h4>
                <p className="order-summary__item-qty">Qty: {item.quantity}</p>
              </div>
              <span className="order-summary__item-price">
                ${(item.product.numericPrice * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}

          {cart.length === 0 && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
              No artifacts selected yet.
            </p>
          )}
        </div>

        {/* Line items */}
        <div className="order-summary__lines">
          <div className="order-summary__line">
            <span>Subtotal</span>
            <span style={{ color: 'var(--charcoal)' }}>${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="order-summary__line order-summary__line--discount">
              <span>Numismatics Discount (15%)</span>
              <span>−${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="order-summary__line">
            <span>Secure Shipping</span>
            <span style={{ color: 'var(--charcoal)' }}>
              {shipping > 0 ? `$${shipping.toFixed(2)}` : '—'}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="order-summary__total">
          <span className="order-summary__total-label">Total</span>
          <span className="order-summary__total-value">${total.toFixed(2)}</span>
        </div>
      </div>
    </aside>
  );
}
