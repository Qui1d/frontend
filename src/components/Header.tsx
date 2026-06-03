import { Link } from 'react-router-dom';

import SearchBar from './SearchBar';

import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const { totalCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="logo">
          Sky Vision Store
        </Link>

        <div className="header__search">
          <SearchBar />
        </div>

        <nav className="header__actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
          >
            {theme === 'light' ? 'Тёмная' : 'Светлая'}
          </button>

          {isAuthenticated && isAdmin && (
            <Link to="/admin" className="header-link header-link--admin">
              Админ-панель
            </Link>
          )}

          {isAuthenticated ? (
            <Link to="/profile" className="header-link header-link--profile">
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

          <Link to="/cart" className="header-link header-link--cart">
            Корзина ({totalCount})
          </Link>

          {isAuthenticated && (
            <button
              className="header-link header-link--button"
              onClick={logout}
              type="button"
            >
              Выйти
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;