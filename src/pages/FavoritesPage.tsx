import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../api/productApi';
import { useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';

import type { Product } from '../types/product';

const FavoritesPage = () => {
  const { isAuthenticated } = useAuth();
  const { favoriteIds, isLoadingFavorites } = useFavorites();

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);
        setError('');

        const loadedProducts = await getProducts();

        setProducts(loadedProducts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Не удалось загрузить избранные товары');
        }
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  const favoriteProducts = useMemo(() => {
    return products.filter((item) => favoriteIds.includes(item.id));
  }, [products, favoriteIds]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const isLoading = loadingProducts || isLoadingFavorites;

  return (
    <div className="page-stack">
      <section className="banner banner--small">
        <div>
          <p className="banner__eyebrow">ИЗБРАННОЕ</p>
          <h1>Избранные товары</h1>
          <p>Здесь собраны игры, которые вы добавили в избранное.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-header">
          <h2>Ваш список избранного</h2>
        </div>

        {isLoading && (
          <div className="empty-state">
            Загрузка избранных товаров...
          </div>
        )}

        {!isLoading && error && (
          <div className="empty-state">
            {error}
          </div>
        )}

        {!isLoading && !error && favoriteProducts.length === 0 && (
          <div className="empty-state">
            В избранном пока нет товаров.
          </div>
        )}

        {!isLoading && !error && favoriteProducts.length > 0 && (
          <ProductGrid products={favoriteProducts} />
        )}
      </section>
    </div>
  );
};

export default FavoritesPage;