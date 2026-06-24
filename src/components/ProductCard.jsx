export function ProductCard({ product, onAddToCart, onQuickView, cartQuantity = 0, onUpdateQuantity, index = 0 }) {
  return (
    <article 
      className="product-card fade-in" 
      id={`product-${product.id}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Decorative corners */}
      <div className="product-card__corner product-card__corner--tl" aria-hidden="true" />
      <div className="product-card__corner product-card__corner--tr" aria-hidden="true" />
      <div className="product-card__corner product-card__corner--bl" aria-hidden="true" />
      <div className="product-card__corner product-card__corner--br" aria-hidden="true" />

      {/* Image */}
      <div className="product-card__image-wrap">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        <div className="product-card__image-overlay" aria-hidden="true" />

        {/* Quick actions */}
        <div className="product-card__actions">
          <button
            className="product-card__action-btn"
            title="Quick View"
            aria-label={`Quick view ${product.name}`}
            onClick={() => onQuickView(product)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button
            className="product-card__action-btn"
            title="Add to Cart"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => onAddToCart(product)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="product-card__body">
        <span className="product-card__era">{product.era}</span>
        <h4 className="product-card__name">{product.name}</h4>
        <p className="product-card__desc">{product.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{product.price}</span>
          {cartQuantity > 0 ? (
            <div className="cart-item__qty" style={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}>
              <button 
                className="cart-item__qty-btn" 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(product.id, -1); }}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="cart-item__qty-value">{cartQuantity}</span>
              <button 
                className="cart-item__qty-btn" 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(product.id, 1); }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className="product-card__acquire" 
              onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Acquire
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
