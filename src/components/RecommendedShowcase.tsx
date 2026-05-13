import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from '../api/productApi';
import { formatPrice } from '../utils/formatPrice';
import type { Product } from '../types/product';

const RecommendedShowcase = () => {
  const [recommendedItems, setRecommendedItems] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRecommendedProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const products = await getProducts();

        const recommendedProducts = products
          .filter((product) => product.isPopular || product.recommendedImage)
          .slice(0, 4);

        setRecommendedItems(
          recommendedProducts.length > 0
            ? recommendedProducts
            : products.slice(0, 4)
        );
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Не удалось загрузить рекомендации');
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecommendedProducts();
  }, []);

  const activeGame = recommendedItems[activeIndex];

  const prevSlide = () => {
    if (recommendedItems.length === 0) {
      return;
    }

    setActiveIndex((prev) =>
      prev === 0 ? recommendedItems.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    if (recommendedItems.length === 0) {
      return;
    }

    setActiveIndex((prev) =>
      prev === recommendedItems.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <section className="recommended-block">
        <div className="recommended-block__header">
          <h2>Рекомендуемые игры</h2>
        </div>

        <div className="empty-state">Загрузка рекомендаций...</div>
      </section>
    );
  }

  if (error || !activeGame) {
    return (
      <section className="recommended-block">
        <div className="recommended-block__header">
          <h2>Рекомендуемые игры</h2>
        </div>

        <div className="empty-state">
          {error || 'Рекомендованные товары не найдены'}
        </div>
      </section>
    );
  }

  return (
    <section className="recommended-block">
      <div className="recommended-block__header">
        <h2>Рекомендуемые игры</h2>
      </div>

      <div className="recommended-showcase">
        <button
          type="button"
          className="recommended-showcase__arrow"
          onClick={prevSlide}
        >
          ‹
        </button>

        <div className="recommended-showcase__content">
          <div className="recommended-showcase__main">
            <img
              src={activeGame.recommendedImage || activeGame.image}
              alt={activeGame.title}
            />
          </div>

          <div className="recommended-showcase__side">
            <h3>{activeGame.title}</h3>

            <p className="recommended-showcase__status">Рекомендуем сейчас</p>

            <p className="recommended-showcase__meta">
              {activeGame.platform} • {activeGame.genre} • {activeGame.region}
            </p>

            <div className="recommended-showcase__price-row">
              {activeGame.oldPrice ? (
                <span className="old-price">{formatPrice(activeGame.oldPrice)}</span>
              ) : null}

              <span className="price">{formatPrice(activeGame.price)}</span>
            </div>

            <p className="recommended-showcase__desc">
              {activeGame.description}
            </p>

            <Link
              to={`/product/${activeGame.slug}`}
              className="primary-btn recommended-showcase__btn"
            >
              Открыть страницу товара
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="recommended-showcase__arrow"
          onClick={nextSlide}
        >
          ›
        </button>
      </div>

      <div className="recommended-showcase__dots">
        {recommendedItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`recommended-showcase__dot ${
              index === activeIndex ? 'recommended-showcase__dot--active' : ''
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendedShowcase;