import { useState, useCallback } from 'react';
import './index.css';
import { products as allProducts } from './data/products';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SidebarFilters } from './components/SidebarFilters';
import { ProductCard } from './components/ProductCard';
import { CheckoutHeader } from './components/CheckoutHeader';
import { CartStep } from './components/CartStep';
import { DetailsStep } from './components/DetailsStep';
import { PaymentStep } from './components/PaymentStep';
import { ConfirmationStep } from './components/ConfirmationStep';
import { OrderSummary } from './components/OrderSummary';
import { SurveyModal } from './components/SurveyModal';
import { Toast } from './components/Toast';
import { QuickViewModal } from './components/QuickViewModal';
import { AccountModal } from './components/AccountModal';
import './modals.css';

function App() {
  // ── Navigation ──
  const [currentView, setCurrentView] = useState('storefront'); // 'storefront' | 'checkout'
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart' | 'details' | 'payment' | 'confirmation'

  // ── Cart ──
  const [cart, setCart] = useState([]);

  // ── Filters ──
  const [filters, setFilters] = useState({
    era: [],
    category: [],
    material: [],
    origin: [],
    condition: [],
    maxPrice: 2000,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // ── Survey ──
  const [showSurvey, setShowSurvey] = useState(false);

  // ── Toast ──
  const [toast, setToast] = useState(null);

  // ── Modals ──
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  }, []);

  // ── Cart Actions ──
  const addToCart = useCallback((product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`${product.name} added to your collection`);
  }, [showToast]);

  const updateQuantity = useCallback((productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ── Filtering Logic ──
  const filteredProducts = allProducts.filter((product) => {
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.era.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.material.toLowerCase().includes(q);
      if (!matchesSearch) return false;
    }

    // Era filter
    if (filters.era.length > 0 && !filters.era.includes(product.era)) {
      return false;
    }

    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(product.category)) {
      return false;
    }

    // Material filter
    if (filters.material.length > 0 && !filters.material.includes(product.material)) {
      return false;
    }

    // Origin filter
    if (filters.origin.length > 0 && !filters.origin.includes(product.origin)) {
      return false;
    }

    // Condition filter
    if (filters.condition.length > 0 && !filters.condition.includes(product.condition)) {
      return false;
    }

    // Price range
    if (product.numericPrice > filters.maxPrice) {
      return false;
    }

    return true;
  });

  // ── Sorting ──
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.numericPrice - b.numericPrice;
      case 'price-high':
        return b.numericPrice - a.numericPrice;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0; // featured = default order
    }
  });

  // ── Navigation Handlers ──
  const goToCheckout = useCallback(() => {
    setCurrentView('checkout');
    setCheckoutStep('cart');
  }, []);

  const goToStorefront = useCallback(() => {
    setCurrentView('storefront');
    setShowSurvey(false);
  }, []);

  const advanceCheckout = useCallback(() => {
    const steps = ['cart', 'details', 'payment', 'confirmation'];
    const currentIndex = steps.indexOf(checkoutStep);
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      setCheckoutStep(nextStep);
      if (nextStep === 'confirmation') {
        setTimeout(() => setShowSurvey(true), 500);
      }
    }
  }, [checkoutStep]);

  // ── Filter Handlers ──
  const handleFilterChange = useCallback((filterType, value) => {
    setFilters((prev) => {
      if (filterType === 'maxPrice') {
        return { ...prev, maxPrice: value };
      }
      const current = prev[filterType];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [filterType]: updated };
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ era: [], category: [], material: [], origin: [], condition: [], maxPrice: 2000 });
    setSearchQuery('');
  }, []);

  const handleClaimPiece = useCallback(() => {
    setCurrentView('storefront');
    setFilters((prev) => {
      const hasRoman = prev.era.includes('Roman Republic');
      return {
        ...prev,
        era: hasRoman ? prev.era : [...prev.era, 'Roman Republic']
      };
    });
    setTimeout(() => {
      requestAnimationFrame(() => {
        const el = document.querySelector('.products');
        if (el) {
          const headerOffset = 100;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - headerOffset,
            behavior: 'smooth'
          });
        }
      });
    }, 300);
  }, []);

  // ── Render ──
  if (currentView === 'checkout') {
    return (
      <>
        <CheckoutHeader
          currentStep={checkoutStep}
          onLogoClick={goToStorefront}
        />
        <main className="checkout__main">
          {checkoutStep === 'confirmation' ? (
            <ConfirmationStep
              cart={cart}
              onReturnToStore={goToStorefront}
            />
          ) : (
            <>
              <div className="checkout__form">
                <div className="checkout__page-header">
                  <h1 className="checkout__page-title">
                    {checkoutStep === 'cart' && 'Your Collection'}
                    {checkoutStep === 'details' && 'Shipping Details'}
                    {checkoutStep === 'payment' && (
                      <>
                        Secure Checkout
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      </>
                    )}
                  </h1>
                  <p className="checkout__page-subtitle">
                    {checkoutStep === 'cart' && 'Review the artifacts in your collection before proceeding.'}
                    {checkoutStep === 'details' && 'Where shall we deliver your historical acquisitions?'}
                    {checkoutStep === 'payment' && 'All transactions are secure and encrypted.'}
                  </p>
                </div>

                {checkoutStep === 'cart' && (
                  <CartStep
                    cart={cart}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    onProceed={advanceCheckout}
                    onContinueShopping={goToStorefront}
                  />
                )}
                {checkoutStep === 'details' && (
                  <DetailsStep onProceed={advanceCheckout} />
                )}
                {checkoutStep === 'payment' && (
                  <PaymentStep onProceed={advanceCheckout} />
                )}
              </div>
              <OrderSummary cart={cart} />
            </>
          )}
        </main>

        {showSurvey && (
          <SurveyModal onClose={() => setShowSurvey(false)} />
        )}

        <footer className="footer">
          © 2026 Antiquity Archives — Curating History, One Artifact at a Time
        </footer>

        {toast && <Toast message={toast} />}
      </>
    );
  }

  // STOREFRONT VIEW
  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        onCartClick={goToCheckout}
        onAccountClick={() => setShowAccountModal(true)}
      />
      <HeroBanner onClaimPiece={handleClaimPiece} />
      <main className="storefront__main">
        <SidebarFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={clearFilters}
        />
        <section className="products">
          <div className="products__header">
            <div>
              <h1 className="products__title">Curated Artifacts</h1>
              <p className="products__count">
                Showing {sortedProducts.length} of {allProducts.length} exhibits
              </p>
            </div>
            <div className="products__sort">
              <span>Sort by:</span>
              <select
                className="products__sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </div>
          </div>

          <div className="products__grid">
            {sortedProducts.length > 0 ? (
              sortedProducts.map((product, index) => {
                const cartItem = cart.find(item => item.product.id === product.id);
                const quantity = cartItem ? cartItem.quantity : 0;
                
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    onAddToCart={addToCart}
                    onQuickView={setQuickViewProduct}
                    cartQuantity={quantity}
                    onUpdateQuantity={updateQuantity}
                  />
                );
              })
            ) : (
              <div className="products__empty">
                <h3 className="products__empty-title">No Artifacts Found</h3>
                <p className="products__empty-text">
                  Adjust your filters or search to discover more treasures from our archives.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="footer">
        © 2026 Antiquity Archives — Curating History, One Artifact at a Time
      </footer>

      {toast && <Toast message={toast} />}

      {quickViewProduct && (
        <QuickViewModal 
          product={quickViewProduct} 
          onClose={() => setQuickViewProduct(null)} 
          onAddToCart={addToCart} 
        />
      )}

      {showAccountModal && (
        <AccountModal onClose={() => setShowAccountModal(false)} />
      )}
    </>
  );
}

export default App;
