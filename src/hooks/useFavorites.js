import { useState, useCallback } from 'react';

const FAVORITES_KEY = 'banksift_favorites';

/**
 * Custom hook for managing favorite bank tickers in localStorage.
 * Returns [favorites, toggleFavorite, isFavorite] where:
 * - favorites: Set of ticker strings
 * - toggleFavorite: function(ticker) to add/remove
 * - isFavorite: function(ticker) to check
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const toggleFavorite = useCallback((ticker) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(ticker)) {
        next.delete(ticker);
      } else {
        next.add(ticker);
      }
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isFavorite = useCallback((ticker) => {
    return favorites.has(ticker);
  }, [favorites]);

  return [favorites, toggleFavorite, isFavorite];
}
