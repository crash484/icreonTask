import { useMemo } from 'react';
import type { Product, SortOrder } from '../types';

interface UseFilteredProductsParams {
  products: Product[];
  searchQuery: string;
  selectedCategory: string;
  sortOrder: SortOrder;
}

export function useFilteredProducts({
  products,
  searchQuery,
  selectedCategory,
  sortOrder,
}: UseFilteredProductsParams): Product[] {
  return useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortOrder]);
}