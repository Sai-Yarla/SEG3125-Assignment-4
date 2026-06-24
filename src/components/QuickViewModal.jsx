export function QuickViewModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <div className="modal-content quick-view" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <div className="quick-view__image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        
        <div className="quick-view__details">
          <span className="product-card__era" style={{ marginBottom: '0.5rem' }}>{product.era}</span>
          <h2 id="quick-view-title" className="product-card__name" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            {product.name}
          </h2>
          <p className="product-card__desc" style={{ WebkitLineClamp: 'unset', marginBottom: '2rem' }}>
            {product.description}
          </p>
          
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
              {product.price}
            </div>
            <button 
              className="btn-gold" 
              style={{ marginTop: 0 }}
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
            >
              Add to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
