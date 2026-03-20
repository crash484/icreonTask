import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, ProductStore, FavoritesStore, SortOrder } from '../types';

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: 'all',
  sortOrder: 'none' as SortOrder,
  selectedProduct: null,

  setProducts: (products: Product[]) => set({ products }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  setSelectedCategory: (selectedCategory: string) => set({ selectedCategory }),
  setSortOrder: (sortOrder: SortOrder) => set({ sortOrder }),
  setSelectedProduct: (selectedProduct: Product | null) => set({ selectedProduct }),
}));

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product: Product) => {
        const { favorites } = get();
        const exists = favorites.find((f) => f.id === product.id);
        set({
          favorites: exists
            ? favorites.filter((f) => f.id !== product.id)
            : [...favorites, product],
        });
      },

      isFavorite: (id: number) => get().favorites.some((f) => f.id === id),
    }),
    { name: 'product-dashboard-favorites' }
  )
);