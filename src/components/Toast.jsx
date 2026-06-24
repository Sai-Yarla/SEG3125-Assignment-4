export function Toast({ message }) {
  return (
    <div className="toast" role="status" aria-live="polite">
      <svg
        className="toast__check"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {message}
    </div>
  );
}
