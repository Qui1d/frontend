import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const { totalCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="logo">
          Sky Vision Store
        </Link>

        <div className="header__search">
          <SearchBar />
        </div>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {theme === 'light' ? 'Тёмная' : 'Светлая'}
          </button>

          {isAuthenticated ? (
            <Link to="/profile" className="header-link">
              {user?.username || 'Личный кабинет'}
            </Link>
          ) : (
            <Link to="/auth" className="header-link">
              Войти
            </Link>
          )}

          <Link to="/purchases" className="header-link">
            Мои покупки
          </Link>

          <Link to="/favorites" className="header-link">
            Избранное
          </Link>

          <Link to="/cart" className="header-link">
            Корзина ({totalCount})
          </Link>

          {isAuthenticated && (
            <button
              type="button"
              className="header-link header-link--button"
              onClick={logout}
            >
              Выйти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;