# Icreon Task – Product Dashboard UI

This project is a React + TypeScript + Vite application that provides a product
dashboard experience using the DummyJSON API. It includes UI components for
listing products, searching, filtering, sorting, viewing details, and managing
favorites with persistent storage.

## What the app does

- Fetches product data from `https://dummyjson.com` on load.
- Stores product data and UI filters in a global Zustand store.
- Filters and sorts the product list based on search text, category, and price
  sort order.
- Renders product cards with pricing, discounts, and ratings.
- Opens a detailed modal with an image gallery and full product information.
- Manages a favorites list that persists to `localStorage`.

## How it works (data flow)

1. **Data Fetching**
   - `src/services/api.ts` defines API helpers for products.
   - `src/hooks/useProducts.ts` loads data and updates the product store.
2. **State Management**
   - `src/store/index.ts` uses Zustand to keep products, filters, and favorites.
3. **Filtering & Sorting**
   - `src/hooks/useFilteredProducts.ts` applies search text, category, and price
     sort order to the product list.
4. **UI Rendering**
   - `src/components/Toolbar.tsx` controls search, category, and sort.
   - `src/components/ProductCard.tsx` shows each product summary.
   - `src/components/ProductModal.tsx` shows full product details.
   - `src/components/FavoritesPanel.tsx` lists favorites and totals.


## Project structure

```
src/
  components/      UI components (cards, toolbar, modal, favorites)
  hooks/           data fetching, filtering, and debounce hooks
  services/        API calls to DummyJSON
  store/           Zustand stores for products and favorites
  types/           TypeScript types/interfaces
  App.tsx          Application entry component
  main.tsx         React DOM bootstrap
```

## Getting started

Install dependencies (pnpm is recommended because a pnpm lockfile is included):

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Run linting:

```bash
pnpm lint
```

Preview the production build locally:

```bash
pnpm preview
```

## Tech stack

- React 19 + TypeScript
- Vite
- Zustand (state + favorites persistence)
- CSS (global styles in `src/index.css` and `src/App.css`)
