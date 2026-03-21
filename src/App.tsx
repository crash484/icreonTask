import { useState, useMemo, useCallback } from 'react';
import type { Product } from './types';
import { useProductStore, useFavoritesStore } from './store';
import { useProducts } from './hooks/useProducts';
import { useDebounce } from './hooks/useDebounce';
import { useFilteredProducts } from './hooks/useFilteredProducts';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { SkeletonCard } from './components/SkeletonCard';
import { Toolbar } from './components/Toolbar';
import { FavoritesPanel } from './components/FavortiesPanel';

export default function App() {
  useProducts();

  const {
    products, loading, error,
    searchQuery, setSearchQuery,
    selectedCategory, sortOrder,
    selectedProduct, setSelectedProduct,
  } = useProductStore();

  const { favorites } = useFavoritesStore();

  const [rawSearch, setRawSearch]   = useState<string>('');
  const [favOpen, setFavOpen]       = useState<boolean>(false);

  const debouncedSearch = useDebounce<string>(rawSearch, 400);
  useMemo(() => setSearchQuery(debouncedSearch), [debouncedSearch, setSearchQuery]);

  const categories = useMemo<string[]>(
    () => ['all', ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filteredProducts = useFilteredProducts({
    products, searchQuery, selectedCategory, sortOrder,
  });

  const handleCardClick    = useCallback((p: Product) => setSelectedProduct(p), [setSelectedProduct]);
  const handleClearFilters = useCallback(() => { setRawSearch(''); setSearchQuery(''); }, [setSearchQuery]);

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">M</span>
            <span className="logo-text">Marketplace</span>
          </div>
          <div className="header-divider" />
          <span className="header-sub">Product Explorer</span>
        </div>
        <button className="btn-favorites" onClick={() => setFavOpen(true)}>
          <span className="btn-fav-heart">♥</span>
          <span className="btn-fav-label">Saved Items</span>
          {favorites.length > 0 && (
            <span className="fav-badge">{favorites.length}</span>
          )}
        </button>
      </header>

      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-label">New Collection</div>
        <h1 className="hero-title">
          Discover <em>curated</em> products<br />for every taste
        </h1>
      </div>

      {/* ── Toolbar ── */}
      <Toolbar rawSearch={rawSearch} setRawSearch={setRawSearch} categories={categories} />

      {/* ── Stats bar ── */}
      {!loading && !error && (
        <div className="stats-bar">
          <span className="stats-count">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </span>
          {(searchQuery || selectedCategory !== 'all') && (
            <button className="clear-filters" onClick={handleClearFilters}>
              Clear all filters
            </button>
          )}
        </div>
      )}

      {/* ── Main ── */}
      <main className="main">

        {/* Error */}
        {error && (
          <div className="state-box error-state">
            <div className="state-icon">!</div>
            <h2>Something went wrong</h2>
            <p>{error}</p>
            <button className="state-btn" onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        )}

        {/* Skeletons */}
        {loading && !error && (
          <div className="product-grid">
            {Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="state-box">
            <div className="state-icon">∅</div>
            <h2>No products found</h2>
            <p>Try adjusting your search terms or filter criteria to see more results.</p>
            <button className="state-btn" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onClick={handleCardClick} />
            ))}
          </div>
        )}

      </main>

      {/* ── Modal ── */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      {/* ── Favorites panel ── */}
      <FavoritesPanel open={favOpen} onClose={() => setFavOpen(false)} onProductClick={handleCardClick} />

    </div>
  );
}