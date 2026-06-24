import { useState } from 'react';

export function DetailsStep({ onProceed }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postal: '',
    country: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error on edit
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'Required';
    if (!form.lastName.trim()) newErrors.lastName = 'Required';
    if (!form.email.trim()) newErrors.email = 'Required';
    if (!form.address.trim()) newErrors.address = 'Required';
    if (!form.city.trim()) newErrors.city = 'Required';
    if (!form.postal.trim()) newErrors.postal = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onProceed();
  };

  return (
    <form className="fade-in" onSubmit={handleSubmit} noValidate>
      <div className="form-panel">
        <h3 className="form-panel__title">Contact Information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          <div className="form-row">
            <div>
              <label className="form-label" htmlFor="details-first-name">First Name</label>
              <input
                id="details-first-name"
                type="text"
                className="form-input"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange('firstName')}
                style={errors.firstName ? { borderBottomColor: 'var(--burgundy)' } : {}}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="details-last-name">Last Name</label>
              <input
                id="details-last-name"
                type="text"
                className="form-input"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange('lastName')}
                style={errors.lastName ? { borderBottomColor: 'var(--burgundy)' } : {}}
              />
            </div>
          </div>
          <div>
            <label className="form-label" htmlFor="details-email">Email Address</label>
            <input
              id="details-email"
              type="email"
              className="form-input"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange('email')}
              style={errors.email ? { borderBottomColor: 'var(--burgundy)' } : {}}
            />
          </div>
        </div>

        <h3 className="form-panel__title">Shipping Address</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="form-label" htmlFor="details-address">Street Address</label>
            <input
              id="details-address"
              type="text"
              className="form-input"
              placeholder="Street Address"
              value={form.address}
              onChange={handleChange('address')}
              style={errors.address ? { borderBottomColor: 'var(--burgundy)' } : {}}
            />
          </div>
          <div className="form-row">
            <div>
              <label className="form-label" htmlFor="details-city">City</label>
              <input
                id="details-city"
                type="text"
                className="form-input"
                placeholder="City"
                value={form.city}
                onChange={handleChange('city')}
                style={errors.city ? { borderBottomColor: 'var(--burgundy)' } : {}}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="details-state">State / Province</label>
              <input
                id="details-state"
                type="text"
                className="form-input"
                placeholder="State / Province"
                value={form.state}
                onChange={handleChange('state')}
              />
            </div>
          </div>
          <div className="form-row">
            <div>
              <label className="form-label" htmlFor="details-postal">Postal Code</label>
              <input
                id="details-postal"
                type="text"
                className="form-input"
                placeholder="Postal Code"
                value={form.postal}
                onChange={handleChange('postal')}
                style={errors.postal ? { borderBottomColor: 'var(--burgundy)' } : {}}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="details-country">Country</label>
              <input
                id="details-country"
                type="text"
                className="form-input"
                placeholder="Country"
                value={form.country}
                onChange={handleChange('country')}
              />
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className="btn-gold" id="proceed-to-payment">
        Continue to Payment
      </button>
    </form>
  );
}
