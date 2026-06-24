export function AccountModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="account-title">
      <div className="modal-content account-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        
        <h2 id="account-title" className="account-modal__title">Curator Access</h2>
        <p style={{ color: 'var(--text-body)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Sign in to view your acquired artifacts and manage your collection.
        </p>
        
        <form className="account-modal__form" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <input 
            type="email" 
            className="form-input" 
            placeholder="Email Address" 
            required 
          />
          <input 
            type="password" 
            className="form-input" 
            placeholder="Password" 
            required 
          />
          <button type="submit" className="btn-dark" style={{ marginTop: '1rem' }}>
            Enter Archive
          </button>
        </form>
        
        <div style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>New to the archives? </span>
          <button style={{ color: 'var(--gold)', fontWeight: 600, textDecoration: 'underline' }}>Register</button>
        </div>
      </div>
    </div>
  );
}
