import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/catalog">Каталог</NavLink>
        <NavLink to="/discounts">Скидки</NavLink>
        <NavLink to="/auth">Вход / Регистрация</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;