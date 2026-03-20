import { useEffect } from 'react';
import { fetchProducts } from '../services/api';
import { useProductStore } from '../store';

export function useProducts(): void {
  const { setProducts, setLoading, setError } = useProductStore();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProducts()
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error occurred');
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [setProducts, setLoading, setError]);
}