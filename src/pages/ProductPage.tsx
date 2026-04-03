import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductGrid from '../components/ProductGrid';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';
import { useToast } from '../hooks/useToast';

const ProductPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="card empty-state">
        <h2>Товар не найден</h2>
        <Link to="/catalog" className="primary-btn inline-btn">Вернуться в каталог</Link>
      </div>
    );
  }

  const similarProducts = products.filter(
    (item) => item.genre === product.genre && item.id !== product.id
  );
  return (
    <div className="page-stack">
      <section className="product-page card">
        <img src={product.image} alt={product.title} className="product-page__image" />

        <div className="product-page__info">
          <p className="product-page__platform">{product.platform}</p>
          <h1>{product.title}</h1>
          <p className="product-page__desc">{product.description}</p>
          <p><strong>Регион:</strong> {product.region}</p>
          <p><strong>Жанр:</strong> {product.genre}</p>

          <div className="product-page__prices">
            {product.oldPrice ? <span className="old-price">{formatPrice(product.oldPrice)}</span> : null}
            <span className="price">{formatPrice(product.price)}</span>
            {product.discount ? <span className="discount-chip">-{product.discount}%</span> : null}
          </div>

          <button 
            className="primary-btn"
            onClick={() => {
              addToCart(product);
              showToast(`Товар "${product.title}" добавлен в корзину`);
           }}
          >
            Добавить в корзину
          </button>

          <div className="requirements">
            <h3>Системные требования</h3>
            <ul>
              {product.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
       <section className="page-section">
        <div className="section-header">
          <h2>Похожие товары</h2>
        </div>
        <ProductGrid products={similarProducts} />
      </section>
    </div>
  );
};

export default ProductPage;