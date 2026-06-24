export function HeroBanner({ onClaimPiece }) {
  return (
    <section className="hero" id="hero-banner" aria-label="Promotional banner">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__gradient" aria-hidden="true" />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__tag">
          <div className="hero__tag-line" aria-hidden="true" />
          <h2 className="hero__tag-text">Curator&rsquo;s Special Collection</h2>
          <div className="hero__tag-line" aria-hidden="true" />
        </div>

        <p className="hero__headline">
          Expand your personal exhibit today—uncover 15% off all Roman Numismatics
          for a limited time! Claim your piece of history now.
        </p>

        <button className="hero__cta" id="hero-cta" onClick={onClaimPiece}>
          Claim Your Piece
        </button>
      </div>
    </section>
  );
}
