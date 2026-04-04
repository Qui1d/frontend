import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useCart } from '../hooks/useCart';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
  const { totalCount } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo">
          Sky Vision Store
        </Link>

        <SearchBar />

        <nav className="header__actions">
          <button className="theme-toggle" onClick={toggleTheme} type="button">
            {theme === 'light' ? 'Тёмная' : 'Светлая'}
          </button>

          <Link to="/profile">Личный кабинет</Link>
          <Link to="/purchases">Мои покупки</Link>
          <Link to="/favorites">Избранное</Link>
          <Link to="/cart">Корзина ({totalCount})</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;