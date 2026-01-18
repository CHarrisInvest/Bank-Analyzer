/**
 * React Hooks for Analytics
 * Provides easy-to-use hooks for components to track events
 */

import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { sendPageView } from './gtag.js';
import { 
  trackScrollDepth, 
  trackSearchPerformed,
  trackFilterApplied,
  trackSortChanged,
  trackExchangeFiltered,
} from './events.js';

/**
 * Hook to track page views on route changes
 * Automatically sends page view when location changes
 */
export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Send page view with small delay to ensure title is updated
    const timer = setTimeout(() => {
      sendPageView(location.pathname, document.title);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);
}

/**
 * Hook to track scroll depth
 * Tracks 25%, 50%, 75%, and 100% scroll milestones
 */
export function useScrollTracking() {
  const location = useLocation();
  const trackedMilestones = useRef(new Set());

  useEffect(() => {
    // Reset milestones on page change
    trackedMilestones.current = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) return;
      
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      const milestones = [25, 50, 75, 100];
      for (const milestone of milestones) {
        if (scrollPercent >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);
          trackScrollDepth(milestone, location.pathname);
        }
      }
    };

    // Throttle scroll handler
    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandler, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandler);
  }, [location.pathname]);
}

/**
 * Hook for tracking search with debounce
 * Returns a function to call when search changes
 */
export function useSearchTracking() {
  const searchTimeoutRef = useRef(null);

  const trackSearch = useCallback((queryLength, resultsCount) => {
    // Debounce to avoid tracking every keystroke
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      if (queryLength > 0) {
        trackSearchPerformed(queryLength, resultsCount);
      }
    }, 1000); // Wait 1 second after typing stops
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return trackSearch;
}

/**
 * Hook for tracking filter changes with debounce
 * Returns functions to track various filter changes
 */
export function useFilterTracking() {
  const filterTimeoutRef = useRef(null);

  const trackFilter = useCallback((filterName, filterType) => {
    // Debounce filter tracking
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }

    filterTimeoutRef.current = setTimeout(() => {
      trackFilterApplied(filterName, filterType);
    }, 500);
  }, []);

  const trackSort = useCallback((columnName, direction) => {
    trackSortChanged(columnName, direction);
  }, []);

  const trackExchange = useCallback((exchanges) => {
    trackExchangeFiltered(exchanges);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, []);

  return { trackFilter, trackSort, trackExchange };
}

/**
 * Hook for tracking session duration
 * Sends milestone events at 30s, 60s, 120s, 300s, 600s
 */
export function useSessionTracking() {
  const startTime = useRef(Date.now());
  const trackedMilestones = useRef(new Set());

  useEffect(() => {
    const milestones = [30, 60, 120, 300, 600]; // seconds
    
    const checkMilestone = () => {
      const elapsed = Math.floor((Date.now() - startTime.current) / 1000);
      
      for (const milestone of milestones) {
        if (elapsed >= milestone && !trackedMilestones.current.has(milestone)) {
          trackedMilestones.current.add(milestone);
          // Import dynamically to avoid circular dependency
          import('./events.js').then(({ trackSessionMilestone }) => {
            trackSessionMilestone(milestone);
          });
        }
      }
    };

    const interval = setInterval(checkMilestone, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);
}
