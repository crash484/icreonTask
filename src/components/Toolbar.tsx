import type { SortOrder } from '../types';
import { useProductStore } from '../store';

interface ToolbarProps {
  rawSearch: string;
  setRawSearch: (value: string) => void;
  categories: string[];
}

export function Toolbar({ rawSearch, setRawSearch, categories }: ToolbarProps) {
  const { selectedCategory, setSelectedCategory, sortOrder, setSortOrder } =
    useProductStore();

  return (
    <div className="toolbar">

      {/* Search */}
      <div className="search-wrap">
        <span className="search-icon">⌕</span>
        <input
          className="search-input"
          type="text"
          placeholder="Search products…"
          value={rawSearch}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRawSearch(e.target.value)
          }
          aria-label="Search products"
        />
        {rawSearch && (
          <button
            className="search-clear"
            onClick={() => setRawSearch('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filter */}
      <select
        className="select"
        value={selectedCategory}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedCategory(e.target.value)
        }
        aria-label="Filter by category"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat === 'all'
              ? 'All Categories'
              : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        className="select"
        value={sortOrder}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSortOrder(e.target.value as SortOrder)
        }
        aria-label="Sort products"
      >
        <option value="none">Sort: Default</option>
        <option value="asc">Price: Low → High</option>
        <option value="desc">Price: High → Low</option>
      </select>

    </div>
  );
}