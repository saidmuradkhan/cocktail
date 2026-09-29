import { useCallback, useEffect, useMemo, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';

const STORAGE_KEY = 'amber-lounge:favorites';

function readStoredFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored.filter((item) => item && item.id) : [];
  } catch {
    return [];
  }
}

// Only keep the fields needed to render a card.
const toFavorite = ({ id, name, image, category, alcoholic }) => ({
  id,
  name,
  image,
  category: category ?? null,
  alcoholic: alcoholic ?? null,
});

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readStoredFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Storage can be unavailable (private mode, quota); favorites then stay in memory.
    }
  }, [favorites]);

  const isFavorite = useCallback((id) => favorites.some((item) => item.id === id), [favorites]);

  const toggleFavorite = useCallback((drink) => {
    setFavorites((current) =>
      current.some((item) => item.id === drink.id)
        ? current.filter((item) => item.id !== drink.id)
        : [toFavorite(drink), ...current],
    );
  }, []);

  const clearFavorites = useCallback(() => setFavorites([]), []);

  const value = useMemo(
    () => ({ favorites, count: favorites.length, isFavorite, toggleFavorite, clearFavorites }),
    [favorites, isFavorite, toggleFavorite, clearFavorites],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
