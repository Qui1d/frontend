import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const ProfilePage = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast('Вы вышли из аккаунта');
    navigate('/auth');
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="page-stack">
        <section className="card profile-box">
          <h1>Личный кабинет</h1>

          <p>Вы не вошли в аккаунт.</p>
          <p>Авторизуйтесь, чтобы просматривать данные профиля и купоны.</p>

          <Link to="/auth" className="primary-btn inline-btn">
            Войти / Зарегистрироваться
          </Link>
        </section>

        <section className="card">
          <h2>Купоны</h2>

          <div className="coupon-section">
            <h3>Активированные купоны</h3>

            <div className="coupon-list">
              <div className="coupon-card coupon-card--used">
                <h4>WELCOME10</h4>
                <p>Скидка 10% на первый заказ</p>
                <span>Статус: использован</span>
              </div>

              <div className="coupon-card coupon-card--used">
                <h4>SUMMER15</h4>
                <p>Скидка 15% на выбранные товары</p>
                <span>Статус: использован</span>
              </div>
            </div>
          </div>

          <div className="coupon-section">
            <h3>Доступные купоны</h3>

            <div className="coupon-list">
              <div className="coupon-card">
                <h4>NEWUSER5</h4>
                <p>Скидка 5% на любую игру</p>
                <span>Действует до: 31.12.2026</span>
              </div>

              <div className="coupon-card">
                <h4>VIP20</h4>
                <p>Скидка 20% на премиум-товары</p>
                <span>Действует до: 15.01.2027</span>
              </div>
            </div>
          </div>

          <div className="coupon-section">
            <h3>Как получить купоны</h3>

            <ul className="coupon-rules">
              <li>Регистрация нового аккаунта</li>
              <li>Участие в сезонных акциях и распродажах</li>
              <li>Подписка на e-mail рассылку магазина</li>
              <li>Покупка игр во время специальных событий</li>
              <li>Получение бонусов как постоянный клиент</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="card profile-box">
        <div className="profile-box__top">
          <h1>Личный кабинет</h1>

          <button
            type="button"
            className="secondary-btn profile-box__logout"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>

        <p>
          <strong>Имя:</strong> {user.username}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Статус:</strong> {isAdmin ? 'Администратор' : 'Покупатель'}
        </p>
      </section>

      <section className="card">
        <h2>Купоны</h2>

        <div className="coupon-section">
          <h3>Активированные купоны</h3>

          <div className="coupon-list">
            <div className="coupon-card coupon-card--used">
              <h4>WELCOME10</h4>
              <p>Скидка 10% на первый заказ</p>
              <span>Статус: использован</span>
            </div>

            <div className="coupon-card coupon-card--used">
              <h4>SUMMER15</h4>
              <p>Скидка 15% на выбранные товары</p>
              <span>Статус: использован</span>
            </div>
          </div>
        </div>

        <div className="coupon-section">
          <h3>Доступные купоны</h3>

          <div className="coupon-list">
            <div className="coupon-card">
              <h4>NEWUSER5</h4>
              <p>Скидка 5% на любую игру</p>
              <span>Действует до: 31.12.2026</span>
            </div>

            <div className="coupon-card">
              <h4>VIP20</h4>
              <p>Скидка 20% на премиум-товары</p>
              <span>Действует до: 15.01.2027</span>
            </div>
          </div>
        </div>

        <div className="coupon-section">
          <h3>Как получить купоны</h3>

          <ul className="coupon-rules">
            <li>Регистрация нового аккаунта</li>
            <li>Участие в сезонных акциях и распродажах</li>
            <li>Подписка на e-mail рассылку магазина</li>
            <li>Покупка игр во время специальных событий</li>
            <li>Получение бонусов как постоянный клиент</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;