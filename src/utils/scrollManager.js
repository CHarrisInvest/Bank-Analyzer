/**
 * Scroll Manager Utility
 * Handles saving and restoring scroll positions for navigation
 */

// Storage key for scroll positions
const SCROLL_POSITIONS_KEY = 'banksift_scrollPositions';

/**
 * Get stored scroll positions from sessionStorage
 */
export function getScrollPositions() {
  try {
    const stored = sessionStorage.getItem(SCROLL_POSITIONS_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Save scroll positions to sessionStorage
 */
function saveScrollPositions(positions) {
  try {
    sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(positions));
  } catch {
    // Ignore storage errors
  }
}

/**
 * Save current scroll position for a given path
 * @param {string} path - The route path to save position for
 */
export function saveScrollPosition(path) {
  const positions = getScrollPositions();
  positions[path] = {
    x: window.scrollX,
    y: window.scrollY,
    timestamp: Date.now(),
  };
  saveScrollPositions(positions);
}

/**
 * Get saved scroll position for a given path
 * @param {string} path - The route path to get position for
 * @returns {{ x: number, y: number } | null}
 */
export function getSavedScrollPosition(path) {
  const positions = getScrollPositions();
  const saved = positions[path];

  // Only use saved position if it's less than 30 minutes old
  if (saved && Date.now() - saved.timestamp < 30 * 60 * 1000) {
    return { x: saved.x, y: saved.y };
  }
  return null;
}

/**
 * Clear saved scroll position for a given path
 * @param {string} path - The route path to clear position for
 */
export function clearScrollPosition(path) {
  const positions = getScrollPositions();
  delete positions[path];
  saveScrollPositions(positions);
}

/**
 * Scroll to top of page smoothly
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

/**
 * Restore scroll position for a given path
 * @param {string} path - The route path to restore position for
 * @returns {boolean} - Whether position was restored
 */
export function restoreScrollPosition(path) {
  const saved = getSavedScrollPosition(path);
  if (saved) {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      window.scrollTo({ top: saved.y, left: saved.x, behavior: 'instant' });
    });
    return true;
  }
  return false;
}

/**
 * Clean up old scroll positions (older than 30 minutes)
 */
export function cleanupOldPositions() {
  const positions = getScrollPositions();
  const now = Date.now();
  const maxAge = 30 * 60 * 1000; // 30 minutes

  let hasChanges = false;
  for (const path in positions) {
    if (now - positions[path].timestamp > maxAge) {
      delete positions[path];
      hasChanges = true;
    }
  }

  if (hasChanges) {
    saveScrollPositions(positions);
  }
}
