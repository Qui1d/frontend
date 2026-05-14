import { useEffect, useMemo, useState } from 'react';

import ProductGrid from '../components/ProductGrid';

import { getProducts } from '../api/productApi';
import type { Product } from '../types/product';

const DiscountsPage = () => {
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
          setError('Не удалось загрузить товары со скидкой');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const discountedProducts = useMemo(() => {
    return products.filter((item) => (item.discount || 0) > 0);
  }, [products]);

  return (
    <div className="page-stack">
      <section className="banner banner--small">
        <div>
          <p className="banner__eyebrow">СКИДКИ</p>
          <h1>Лучшие предложения и акции</h1>
          <p>Подборка товаров с самыми выгодными ценами.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-header">
          <h2>Товары со скидкой</h2>
        </div>

        {loading && (
          <div className="empty-state">
            Загрузка товаров со скидкой...
          </div>
        )}

        {!loading && error && (
          <div className="empty-state">
            {error}
          </div>
        )}

        {!loading && !error && discountedProducts.length === 0 && (
          <div className="empty-state">
            Сейчас нет товаров со скидкой.
          </div>
        )}

        {!loading && !error && discountedProducts.length > 0 && (
          <ProductGrid products={discountedProducts} />
        )}
      </section>
    </div>
  );
};

export default DiscountsPage;