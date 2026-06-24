export function Header({ searchQuery, onSearchChange, cartCount, onCartClick, onAccountClick }) {
  return (
    <header className="header" id="main-header">
      {/* Logo */}
      <div className="header__logo" role="banner">
        <span className="header__logo-main">Antiquity</span>
        <span className="header__logo-sub">Archives</span>
      </div>

      {/* Search Bar */}
      <div className="header__search">
        <div className="header__search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <input
          id="search-input"
          type="text"
          className="header__search-input"
          placeholder="Search for artifacts, eras, or materials..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search artifacts"
        />
      </div>

      {/* Actions */}
      <div className="header__actions">
        <button className="header__action-btn" onClick={onAccountClick} aria-label="Account" id="account-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span className="header__action-label">Account</span>
        </button>
        <button
          className="header__action-btn"
          onClick={onCartClick}
          aria-label={`Shopping cart with ${cartCount} items`}
          id="cart-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          <span className="header__action-label">Cart</span>
          {cartCount > 0 && (
            <span className="header__cart-badge" aria-hidden="true">{cartCount}</span>
          )}
        </button>
      </div>
    </header>
  );
}
