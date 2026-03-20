import { useEffect, useState, useCallback } from 'react';
import type { Product } from '../types';
import { useFavoritesStore } from '../store';
import { StarRating } from '../utils/StarRating';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [imgIdx, setImgIdx] = useState<number>(0);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const fav = isFavorite(product.id);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const images: string[] =
    product.images?.length ? product.images : [product.thumbnail];

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
    >
      <div className="modal-drawer">

        {/* Sticky header */}
        <div className="modal-header">
          <span className="modal-header-label">Product Detail</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-content">

          {/* Gallery */}
          <div className="modal-gallery">
            <img
              src={images[imgIdx]}
              alt={`${product.title} — image ${imgIdx + 1}`}
              className="modal-main-img"
            />
            {images.length > 1 && (
              <div className="modal-thumbs">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`View ${i + 1}`}
                    className={`thumb ${i === imgIdx ? 'active' : ''}`}
                    onClick={() => setImgIdx(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="modal-info">
            <div>
              <div className="modal-category">{product.category}</div>
              <h2 className="modal-title">{product.title}</h2>
            </div>

            <div className="modal-rating-row">
              <StarRating rating={product.rating} size={15} />
            </div>

            <p className="modal-desc">{product.description}</p>

            <div className="modal-price-row">
              <div className="modal-price">${product.price}</div>
              {product.discountPercentage > 0 && (
                <span className="modal-discount">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            <div className="modal-details">
              <DetailRow label="Brand"         value={product.brand ?? '—'} />
              <DetailRow label="Stock"         value={product.stock > 0 ? `${product.stock} units` : 'Out of stock'} />
              <DetailRow label="SKU"           value={product.sku ?? '—'} />
              <DetailRow label="Warranty"      value={product.warrantyInformation ?? '—'} />
              <DetailRow label="Shipping"      value={product.shippingInformation ?? '—'} />
              <DetailRow label="Return Policy" value={product.returnPolicy ?? '—'} />
            </div>

            <button
              className={`btn-fav-modal ${fav ? 'active' : ''}`}
              onClick={() => toggleFavorite(product)}
            >
              {fav ? '♥  Remove from Favorites' : '♡  Save to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}