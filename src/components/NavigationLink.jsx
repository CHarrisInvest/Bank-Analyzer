import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPageView } from '../analytics/gtag.js';

/**
 * NavigationLink Component
 * A custom link component that:
 * - Captures scroll position at click time
 * - Passes navigation state for back button functionality
 * - Tracks page views for analytics
 */
function NavigationLink({
  to,
  state = {},
  className,
  children,
  trackPageView = true,
  pageTitle,
  ...props
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // Capture current scroll position
    const scrollY = window.scrollY;

    // Build state with scroll position
    const navigationState = {
      ...state,
      scrollY,
    };

    // Track page view if enabled
    if (trackPageView) {
      sendPageView(to, pageTitle || to);
    }

    // Navigate with state
    navigate(to, { state: navigationState });
  };

  return (
    <a
      href={to}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}

export default NavigationLink;
