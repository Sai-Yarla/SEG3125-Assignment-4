import { useState } from 'react';

export function PaymentStep({ onProceed }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [form, setForm] = useState({
    cardNumber: '',
    expiration: '',
    cvv: '',
    nameOnCard: '',
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onProceed();
  };

  return (
    <form className="fade-in" onSubmit={handleSubmit}>
      <div className="form-panel">
        <h3 className="form-panel__title">Payment Information</h3>

        {/* Payment method selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <label
            className={`payment-option ${paymentMethod === 'card' ? 'payment-option--selected' : ''}`}
            id="payment-card-option"
          >
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <span className="payment-option__radio" />
            <span className="payment-option__label">Credit or Debit Card</span>
          </label>
          <label
            className={`payment-option ${paymentMethod === 'paypal' ? 'payment-option--selected' : ''}`}
            id="payment-paypal-option"
          >
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => setPaymentMethod('paypal')}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <span className="payment-option__radio" />
            <span className="payment-option__label">PayPal Archive Transfer</span>
          </label>
        </div>

        {/* Card fields */}
        {paymentMethod === 'card' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="form-label" htmlFor="card-number">Card Number</label>
              <input
                id="card-number"
                type="text"
                className="form-input"
                placeholder="Card Number"
                value={form.cardNumber}
                onChange={handleChange('cardNumber')}
                maxLength={19}
                style={{ letterSpacing: '0.15em' }}
              />
            </div>
            <div className="form-row">
              <div>
                <label className="form-label" htmlFor="card-expiry">Expiration</label>
                <input
                  id="card-expiry"
                  type="text"
                  className="form-input"
                  placeholder="Expiration (MM/YY)"
                  value={form.expiration}
                  onChange={handleChange('expiration')}
                  maxLength={5}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="card-cvv">Security Code</label>
                <input
                  id="card-cvv"
                  type="text"
                  className="form-input"
                  placeholder="Security Code (CVV)"
                  value={form.cvv}
                  onChange={handleChange('cvv')}
                  maxLength={4}
                />
              </div>
            </div>
            <div>
              <label className="form-label" htmlFor="card-name">Name on Card</label>
              <input
                id="card-name"
                type="text"
                className="form-input"
                placeholder="Name on Card"
                value={form.nameOnCard}
                onChange={handleChange('nameOnCard')}
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-body)', fontSize: '0.9rem' }}>
            <p>You will be redirected to PayPal to complete your acquisition securely.</p>
          </div>
        )}
      </div>

      <button type="submit" className="btn-gold" id="complete-acquisition">
        Complete Acquisition
      </button>
    </form>
  );
}
