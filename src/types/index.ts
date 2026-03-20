export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
 
export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  thumbnail: string;
  images: string[];
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  reviews?: Review[];
}
 
export type SortOrder = 'none' | 'asc' | 'desc';
 
export interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string;
  sortOrder: SortOrder;
  selectedProduct: Product | null;
  setProducts: (products: Product[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortOrder: (order: SortOrder) => void;
  setSelectedProduct: (product: Product | null) => void;
}
 
export interface FavoritesStore {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (id: number) => boolean;
}