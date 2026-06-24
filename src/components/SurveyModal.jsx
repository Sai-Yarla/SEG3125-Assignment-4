import { useState } from 'react';

export function SurveyModal({ onClose }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="survey-modal" id="survey-modal" role="dialog" aria-label="Customer survey">
      {/* Header */}
      <div className="survey-modal__header">
        <h4 className="survey-modal__title">Expedition Survey</h4>
        <button
          className="survey-modal__close"
          onClick={onClose}
          aria-label="Close survey"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      {/* Body */}
      <div className="survey-modal__body">
        {!submitted ? (
          <>
            <p className="survey-modal__text">
              &ldquo;We would love to hear about your expedition through our archives!
              Please take a moment to share your thoughts so we can continue to curate
              the finest historical pieces for your collection. Did you successfully
              unearth the artifacts you were seeking today?&rdquo;
            </p>

            {/* Star Rating */}
            <div className="survey-modal__stars" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`survey-modal__star ${
                    star <= (hoverRating || rating)
                      ? 'survey-modal__star--active'
                      : 'survey-modal__star--inactive'
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  id={`star-${star}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Text Input */}
            <input
              type="text"
              className="survey-modal__input"
              placeholder="Tell us about your discovery..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              id="survey-feedback-input"
            />

            {/* Submit Button */}
            <button
              className="btn-dark"
              onClick={handleSubmit}
              id="survey-submit"
            >
              Submit Record
            </button>
          </>
        ) : (
          <div className="survey-modal__thanks">
            <div className="survey-modal__thanks-icon">✦</div>
            <p className="survey-modal__thanks-text">Thank You, Collector</p>
            <p className="survey-modal__thanks-sub">
              Your insights help us curate a finer archive.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
