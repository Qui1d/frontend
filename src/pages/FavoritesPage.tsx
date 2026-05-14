import { useEffect, useMemo, useState } from 'react';

import ProductGrid from '../components/ProductGrid';

import { getProducts } from '../api/productApi';
import { useFavorites } from '../hooks/useFavorites';
import type { Product } from '../types/product';

const FavoritesPage = () => {
  const { favoriteIds } = useFavorites();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const favoriteProducts = useMemo(() => {
    return products.filter((item) => favoriteIds.includes(item.id));
  }, [products, favoriteIds]);

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

        {loading && (
          <div className="empty-state">
            Загрузка избранных товаров...
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            {error}
          </div>
        )}

        {!loading && !error && favoriteProducts.length === 0 && (
          <div className="empty-state">
            В избранном пока нет товаров.
          </div>
        )}

        {!loading && !error && favoriteProducts.length > 0 && (
          <ProductGrid products={favoriteProducts} />
        )}
      </section>
    </div>
  );
};

export default FavoritesPage;