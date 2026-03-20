import { useMemo } from 'react';
import type { Product } from '../types';
import { useFavoritesStore } from '../store';

interface FavoritesPanelProps {
  open: boolean;
  onClose: () => void;
  onProductClick: (product: Product) => void;
}

export function FavoritesPanel({ open, onClose, onProductClick }: FavoritesPanelProps) {
  const { favorites, toggleFavorite } = useFavoritesStore();

  const total = useMemo(
    () => favorites.reduce((sum, p) => sum + p.price, 0).toFixed(2),
    [favorites]
  );

  const handleItemClick = (product: Product) => {
    onProductClick(product);
    onClose();
  };

  return (
    <>
      {open && (
        <div
          className="fav-overlay"
          onClick={onClose}
          role="presentation"
          aria-hidden="true"
        />
      )}
      <aside
        className={`fav-panel ${open ? 'open' : ''}`}
        aria-label="Favorites panel"
        aria-hidden={!open}
      >
        <div className="fav-header">
          <h2>
            Saved Items
            <span className="fav-count">{favorites.length}</span>
          </h2>
          <button className="fav-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {favorites.length === 0 ? (
          <div className="fav-empty">
            <div className="fav-empty-icon">♡</div>
            <p>Nothing saved yet</p>
            <small>Click the heart icon on any product to save it here for later.</small>
          </div>
        ) : (
          <>
            <ul className="fav-list">
              {favorites.map((product) => (
                <li key={product.id} className="fav-item">
                  <div
                    className="fav-item-img-wrap"
                    onClick={() => handleItemClick(product)}
                  >
                    <img src={product.thumbnail} alt={product.title} />
                  </div>
                  <div
                    className="fav-item-info"
                    onClick={() => handleItemClick(product)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleItemClick(product)}
                  >
                    <span className="fav-item-title">{product.title}</span>
                    <span className="fav-item-price">${product.price}</span>
                  </div>
                  <button
                    className="fav-remove"
                    onClick={() => toggleFavorite(product)}
                    aria-label={`Remove ${product.title}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>

            <div className="fav-total">
              <span className="fav-total-label">Total</span>
              <span className="fav-total-value">${total}</span>
            </div>
          </>
        )}
      </aside>
    </>
  );
}