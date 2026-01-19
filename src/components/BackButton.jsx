import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Back Button Component
 * Uses browser history to navigate back to the previous page
 */
function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    // Use browser history to go back
    navigate(-1);
  };

  return (
    <button
      className="back-button"
      onClick={handleBack}
      aria-label="Go back"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 12L6 8l4-4" />
      </svg>
      <span>Back</span>
    </button>
  );
}

export default BackButton;
