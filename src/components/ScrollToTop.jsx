import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTop, cleanupOldPositions } from '../utils/scrollManager.js';

/**
 * ScrollToTop Component
 * Scrolls to top of page on forward navigation (when not coming from back button)
 *
 * The back button passes state.restoreScroll = true to skip scroll-to-top
 */
function ScrollToTop() {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip on first render (initial page load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      cleanupOldPositions();
      return;
    }

    // Check if this navigation should restore scroll (back button)
    const shouldRestoreScroll = location.state?.restoreScroll;

    // Only scroll to top on forward navigation
    if (!shouldRestoreScroll) {
      scrollToTop();
    }
  }, [location.pathname, location.state?.restoreScroll]);

  return null;
}

export default ScrollToTop;
