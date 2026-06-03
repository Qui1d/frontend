import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from '../api/favoriteApi';

import { useAuth } from '../hooks/useAuth';

interface FavoritesContextType {
  favoriteIds: number[];
  isLoadingFavorites: boolean;
  toggleFavorite: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, token } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!isAuthenticated || !token) {
        setFavoriteIds([]);
        setIsLoadingFavorites(false);
        return;
      }

      try {
        setIsLoadingFavorites(true);

        const favorites = await getFavorites();

        setFavoriteIds(favorites.map((favorite) => favorite.productId));
      } catch {
        setFavoriteIds([]);
      } finally {
        setIsLoadingFavorites(false);
      }
    };

    loadFavorites();
  }, [isAuthenticated, token]);

  const isFavorite = useCallback(
    (id: number) => {
      return favoriteIds.includes(id);
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    async (id: number) => {
      if (!isAuthenticated || !token) {
        throw new Error('AUTH_REQUIRED');
      }

      const wasFavorite = favoriteIds.includes(id);

      setFavoriteIds((prev) =>
        wasFavorite
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      );

      try {
        if (wasFavorite) {
          await removeFavorite(id);
        } else {
          await addFavorite(id);
        }
      } catch (error) {
        setFavoriteIds((prev) =>
          wasFavorite
            ? [...prev, id]
            : prev.filter((item) => item !== id)
        );

        throw error;
      }
    },
    [favoriteIds, isAuthenticated, token]
  );

  const value = useMemo(() => {
    return {
      favoriteIds,
      isLoadingFavorites,
      toggleFavorite,
      isFavorite,
    };
  }, [favoriteIds, isLoadingFavorites, toggleFavorite, isFavorite]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};