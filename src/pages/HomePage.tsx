import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="page-stack">
      <section className="hero-welcome">
        <div className="hero-welcome__content">
          <p className="hero-welcome__eyebrow">SKY VISION STORE</p>
          <h1>Добро пожаловать в магазин игровых ключей</h1>
          <p className="hero-welcome__text">
            Sky Vision Store — это современный интернет-магазин цифровых ключей для
            Steam, Epic Games, PlayStation, Xbox, Battle.net, Origin, Uplay и других
            платформ. Здесь пользователь может быстро найти нужную игру, посмотреть
            скидки, добавить товар в корзину и оформить заказ в удобном интерфейсе.
          </p>

          <div className="hero-welcome__actions">
            <Link to="/catalog" className="primary-btn">
              Перейти в каталог
            </Link>
            <Link to="/discounts" className="secondary-btn">
              Смотреть скидки
            </Link>
          </div>
        </div>
      </section>

      <section className="welcome-grid">
        <div className="card welcome-card">
          <h2>Что есть в магазине</h2>
          <ul className="welcome-list">
            <li>Ключи для Steam, Epic Games, Xbox, PlayStation и других платформ</li>
            <li>Удобный каталог с поиском, фильтрацией и сортировкой</li>
            <li>Страница товара с описанием, регионом и системными требованиями</li>
            <li>Корзина, оформление заказа и личный кабинет</li>
          </ul>
        </div>

        <div className="card welcome-card">
          <h2>Преимущества интерфейса</h2>
          <ul className="welcome-list">
            <li>Понятная навигация между страницами</li>
            <li>Современный адаптивный дизайн</li>
            <li>Раздел со скидками и акциями</li>
            <li>Избранное и быстрый переход к покупкам</li>
          </ul>
        </div>

        <div className="card welcome-card">
          <h2>Почему стоит выбрать Sky Vision Store</h2>
          <ul className="welcome-list">
            <li>Современный и удобный интерфейс для быстрого поиска игр</li>
            <li>Раздел с акциями и выгодными предложениями</li>
            <li>Поддержка избранного, корзины и оформления заказа</li>
            <li>Отдельные страницы товара с полной информацией</li>
            <li>Адаптивный дизайн для компьютера, планшета и телефона</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default HomePage;