const ProfilePage = () => {
  return (
    <div className="page-stack">
      <section className="card profile-box">
        <h1>Личный кабинет</h1>
        <p><strong>Имя:</strong> Demo User</p>
        <p><strong>Email:</strong> demo@example.com</p>
        <p><strong>Статус:</strong> Покупатель</p>
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