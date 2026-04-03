import { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';

const recommendedItems = products.slice(0, 4);

const RecommendedShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGame = recommendedItems[activeIndex];

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? recommendedItems.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === recommendedItems.length - 1 ? 0 : prev + 1
    );
  };

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