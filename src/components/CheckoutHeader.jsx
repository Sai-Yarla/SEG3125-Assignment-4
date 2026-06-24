export function CheckoutHeader({ currentStep, onLogoClick }) {
  const steps = [
    { id: 'cart', label: 'Cart' },
    { id: 'details', label: 'Details' },
    { id: 'payment', label: 'Payment' },
    { id: 'confirmation', label: 'Confirmation' },
  ];

  const stepOrder = ['cart', 'details', 'payment', 'confirmation'];
  const currentIndex = stepOrder.indexOf(currentStep);

  const getStatus = (stepId) => {
    const stepIndex = stepOrder.indexOf(stepId);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <header className="checkout-header" id="checkout-header">
      {/* Logo */}
      <button className="header__logo" onClick={onLogoClick} aria-label="Return to storefront">
        <span className="header__logo-main">Antiquity</span>
        <span className="header__logo-sub">Archives</span>
      </button>

      {/* Progress Tracker */}
      <nav className="checkout-header__nav" aria-label="Checkout Progress">
        <ol className="checkout-header__steps">
          {steps.map((step, index) => {
            const status = getStatus(step.id);
            return (
              <li key={step.id} className="checkout-header__step">
                <span
                  className={`checkout-header__step-content checkout-header__step-content--${status}`}
                  aria-current={status === 'active' ? 'step' : undefined}
                >
                  {status === 'completed' && (
                    <svg
                      className="checkout-header__check"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  )}
                  <span
                    style={
                      status === 'active'
                        ? { fontWeight: 800, textDecoration: 'underline', textUnderlineOffset: '4px' }
                        : {}
                    }
                  >
                    {step.label}
                  </span>
                </span>

                {index < steps.length - 1 && (
                  <span className="checkout-header__separator" aria-hidden="true">
                    ❧
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Spacer for centering */}
      <div className="checkout-header__spacer" />
    </header>
  );
}
