import { useCallback } from 'react';
import type { Product } from '../types';
import { useFavoritesStore } from '../store';
import { StarRating } from '../utils/StarRating';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const fav = isFavorite(product.id);

  const handleFav = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleFavorite(product);
    },
    [product, toggleFavorite]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') onClick(product);
    },
    [product, onClick]
  );

  const discount =
    product.discountPercentage > 0 ? Math.round(product.discountPercentage) : null;

  return (
    <div
      className="product-card"
      onClick={() => onClick(product)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.title}`}
    >
      <div className="card-img-wrap">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
        {discount !== null && (
          <span className="badge-discount">−{discount}%</span>
        )}
        <button
          className={`btn-fav ${fav ? 'active' : ''}`}
          onClick={handleFav}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>

      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.title}</h3>
        <StarRating rating={product.rating} size={13} />
        <div className="card-footer">
          <span className="price">
            <span className="price-currency">$</span>
            {product.price}
          </span>
          {product.stock === 0 && (
            <span className="stock-tag out-stock">Out of stock</span>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <span className="stock-tag low-stock">Only {product.stock} left</span>
          )}
        </div>
      </div>
    </div>
  );
}