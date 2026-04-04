import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-clean">
      <section className="home-clean__hero">

        <div className="home-clean__brand">Sky Vision Store</div>

        <div className="home-clean__center">
          <h1>Переосмысли покупку игровых ключей</h1>
          <p className="home-clean__subtitle">
            Удобный магазин цифровых ключей с каталогом игр, скидками, избранным,
            корзиной и персональными разделами.
          </p>

          <div className="home-clean__actions">
            <Link to="/catalog" className="primary-btn">
              Перейти в каталог
            </Link>
            <Link to="/discounts" className="secondary-btn">
              Смотреть скидки
            </Link>
          </div>
        </div>

        <div className="home-clean__scene">
          <div className="home-clean__scene-left" />
          <div className="home-clean__scene-right" />
        </div>
      </section>

      <section className="home-clean__content">
        <div className="home-clean__text-block">
          <h2>О магазине</h2>
          <p>
            Sky Vision Store — это современный интернет-магазин цифровых игровых
            ключей. Сайт создан для быстрого поиска игр, удобной навигации по
            основным разделам и комфортного выбора товаров для разных игровых
            платформ.
          </p>
        </div>

        <div className="home-clean__text-block">
          <h2>Что доступно пользователю</h2>
          <p>
            Пользователь может просматривать каталог, искать игры по названию,
            фильтровать товары по платформе и жанру, открывать страницы игр,
            добавлять товары в корзину и в избранное, а также работать с
            купонами и персональными разделами.
          </p>
        </div>

        <div className="home-clean__text-block">
          <h2>О гарантии</h2>
          <p>
            Мы гарантируем, что каждый цифровой ключ соответствует выбранному
            товару и будет доставлен пользователю. Sky Vision Store ручается за
            корректность представленной информации о товаре и за то, что
            приобретённый ключ предназначен именно для указанной платформы и
            региона активации.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;