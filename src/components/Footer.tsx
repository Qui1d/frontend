const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__columns">
          <div className="footer__column">
            <h4>Навигация</h4>
            <a href="/">Главная</a>
            <a href="/catalog">Каталог</a>
            <a href="/discounts">Скидки</a>
            <a href="/purchases">Мои покупки</a>
          </div>

          <div className="footer__column">
            <h4>Покупателям</h4>
            <a href="/auth">Личный кабинет</a>
            <a href="/cart">Корзина</a>
            <a href="/checkout">Оформление заказа</a>
            <a href="/">Гарантии</a>
          </div>

          <div className="footer__column">
            <h4>Информация</h4>
            <a href="/">О магазине</a>
            <a href="/">Контакты</a>
            <a href="/">FAQ</a>
            <a href="/">Политика конфиденциальности</a>
          </div>
        </div>

        <div className="footer__features">
          <div className="footer__feature">
            <span className="footer__feature-icon"></span>
            <span>Выгодные цены</span>
          </div>
          <div className="footer__feature">
            <span className="footer__feature-icon"></span>
            <span>Гарантия качества</span>
          </div>
          <div className="footer__feature">
            <span className="footer__feature-icon"></span>
            <span>Быстрая выдача ключей</span>
          </div>
          <div className="footer__feature">
            <span className="footer__feature-icon"></span>
            <span>Поддержка покупателей</span>
          </div>
          <div className="footer__feature">
            <span className="footer__feature-icon"></span>
            <span>Скидки и бонусы</span>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__socials">
            <a href="/" className="footer__social">Telegram</a>
            <a href="/" className="footer__social">Discord</a>
            <a href="/" className="footer__social">YouTube</a>
          </div>

          <div className="footer__subscribe">
            <span>Подписка на новости</span>
            <button type="button" className="footer__subscribe-btn">
              E-mail рассылка
            </button>
          </div>
        </div>
      </div>

      <div className="container footer__copyright">
        <p>© 2026 Sky Vision Store. Магазин цифровых игровых ключей.</p>
      </div>
    </footer>
  );
};

export default Footer;