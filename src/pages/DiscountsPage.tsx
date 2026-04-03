import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const DiscountsPage = () => {
  const discountedProducts = products.filter((item) => (item.discount || 0) > 0);

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
        <ProductGrid products={discountedProducts} />
      </section>
    </div>
  );
};

export default DiscountsPage;