import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteState {
  favorites: string[];
  addFavorite: (caseId: string) => void;
  removeFavorite: (caseId: string) => void;
  toggleFavorite: (caseId: string) => void;
  isFavorite: (caseId: string) => boolean;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (caseId: string) => {
        set(state => ({
          favorites: [...state.favorites, caseId]
        }));
      },

      removeFavorite: (caseId: string) => {
        set(state => ({
          favorites: state.favorites.filter(id => id !== caseId)
        }));
      },

      toggleFavorite: (caseId: string) => {
        const { favorites, addFavorite, removeFavorite } = get();
        if (favorites.includes(caseId)) {
          removeFavorite(caseId);
        } else {
          addFavorite(caseId);
        }
      },

      isFavorite: (caseId: string) => {
        return get().favorites.includes(caseId);
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
);
