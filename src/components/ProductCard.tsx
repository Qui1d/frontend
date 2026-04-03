import { Link } from 'react-router-dom';
import type { Product } from '../types/product';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { formatPrice } from '../utils/formatPrice';
import { useToast } from '../hooks/useToast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.title} className="product-card__image" />
        </Link>
        {product.discount ? <span className="product-card__badge">-{product.discount}%</span> : null}
        <button
          className={`favorite-btn ${isFavorite(product.id) ? 'favorite-btn--active' : ''}`}
          onClick={() => toggleFavorite(product.id)}
          type="button"
        >
          ♥
        </button>
      </div>
      <div className="product-card__body">
        <p className="product-card__platform">{product.platform}</p>
        <Link to={`/product/${product.slug}`} className="product-card__title">
          {product.title}
        </Link>
        <p className="product-card__meta">{product.genre} • {product.region}</p>

        <div className="product-card__prices">
          {product.oldPrice ? <span className="old-price">{formatPrice(product.oldPrice)}</span> : null}
          <span className="price">{formatPrice(product.price)}</span>
        </div>

        <button
          className="primary-btn product-card__button"
          onClick={() => {
            addToCart(product);
            showToast(`Товар "${product.title}" добавлен в корзину`);
       }}
     >
      В корзину
     </button>
      </div>
    </article>
  );
};

export default ProductCard;