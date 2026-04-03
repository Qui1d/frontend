import { useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { formatPrice } from '../utils/formatPrice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const blurTimeoutRef = useRef<number | null>(null);

  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) return [];

    return products
      .filter((product) => product.title.toLowerCase().includes(trimmed))
      .slice(0, 6);
  }, [query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    navigate(`/catalog?search=${encodeURIComponent(trimmed)}`);
    setIsFocused(false);
  };

  const handleFocus = () => {
    if (blurTimeoutRef.current) {
      window.clearTimeout(blurTimeoutRef.current);
    }
    setIsFocused(true);
  };

  const handleBlur = () => {
    blurTimeoutRef.current = window.setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  const showDropdown = isFocused && query.trim().length > 0;

  return (
    <div className="search-bar-wrapper">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Поиск игр..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <button type="submit">Поиск</button>
      </form>

      {showDropdown && (
        <div className="search-dropdown">
          {filteredProducts.length > 0 ? (
            <>
              <div className="search-dropdown__title">Результаты поиска</div>

              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className="search-dropdown__item"
                  onMouseDown={() => {
                    navigate(`/product/${product.slug}`);
                    setIsFocused(false);
                    setQuery('');
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="search-dropdown__image"
                  />

                  <div className="search-dropdown__info">
                    <div className="search-dropdown__name">{product.title}</div>

                    <div className="search-dropdown__meta">
                      {product.discount ? (
                        <span className="search-dropdown__discount">
                          -{product.discount}%
                        </span>
                      ) : null}

                      {product.oldPrice ? (
                        <span className="search-dropdown__old-price">
                          {formatPrice(product.oldPrice)}
                        </span>
                      ) : null}

                      <span className="search-dropdown__price">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="search-dropdown__empty">Ничего не найдено</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;