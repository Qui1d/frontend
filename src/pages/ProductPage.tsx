import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ProductGrid from '../components/ProductGrid';

import { getProductBySlug, getProducts } from '../api/productApi';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { formatPrice } from '../utils/formatPrice';
import type { Product } from '../types/product';

const ProductPage = () => {
  const { slug } = useParams();

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      if (!slug) {
        setError('Товар не найден');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const [loadedProduct, loadedProducts] = await Promise.all([
          getProductBySlug(slug),
          getProducts(),
        ]);

        setProduct(loadedProduct);
        setProducts(loadedProducts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Не удалось загрузить товар');
        }

        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const similarProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter((item) => item.genre === product.genre && item.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  if (loading) {
    return (
      <div className="card empty-state">
        Загрузка товара...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="card empty-state">
        <h2>Товар не найден</h2>
        <p>{error || 'Не удалось найти выбранный товар.'}</p>
        <Link to="/catalog" className="primary-btn inline-btn">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="product-page card">
        <img src={product.image} alt={product.title} className="product-page__image" />

        <div className="product-page__info">
          <p className="product-page__platform">{product.platform}</p>

          <h1>{product.title}</h1>

          <p className="product-page__desc">{product.description}</p>

          <p>
            <strong>Регион:</strong> {product.region}
          </p>

          <p>
            <strong>Жанр:</strong> {product.genre}
          </p>

          <div className="product-page__prices">
            {product.oldPrice ? (
              <span className="old-price">{formatPrice(product.oldPrice)}</span>
            ) : null}

            <span className="price">{formatPrice(product.price)}</span>

            {product.discount ? (
              <span className="discount-chip">-{product.discount}%</span>
            ) : null}
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