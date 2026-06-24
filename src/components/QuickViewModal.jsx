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
          <p className="product-card__desc" style={{ WebkitLineClamp: 'unset', marginBottom: '1.5rem', flex: 'none' }}>
            {product.description}
          </p>

          <div style={{ marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.5)', border: '1px solid var(--sand-border)', fontSize: '0.85rem' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>Artifact Dossier</h4>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', color: 'var(--charcoal)' }}>
              <li><strong>Material:</strong> {product.material}</li>
              <li><strong>Condition:</strong> {product.condition || 'Museum Grade'}</li>
              <li><strong>Origin:</strong> {product.origin || 'Authenticated'}</li>
              <li><strong>Shipping:</strong> Insured & Tracked</li>
            </ul>
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', borderTop: '1px dashed var(--sand-muted)', paddingTop: '1.5rem' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--charcoal)' }}>
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
