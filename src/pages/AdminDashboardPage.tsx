import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  return (
    <div className="page-stack">
      <section className="banner banner--small">
        <div>
          <p className="banner__eyebrow">АДМИН-ПАНЕЛЬ</p>
          <h1>Панель управления</h1>
          <p>Раздел для управления товарами, заказами, пользователями и купонами.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-header">
          <h2>Разделы управления</h2>
        </div>

        <div className="admin-grid">
          <Link to="/admin/products" className="admin-card">
            <h3>Товары</h3>
            <p>Добавление, редактирование и удаление игр.</p>
          </Link>

          <div className="admin-card admin-card--disabled">
            <h3>Заказы</h3>
            <p>Будет добавлено позже.</p>
          </div>

          <div className="admin-card admin-card--disabled">
            <h3>Пользователи</h3>
            <p>Будет добавлено позже.</p>
          </div>

          <div className="admin-card admin-card--disabled">
            <h3>Купоны</h3>
            <p>Будет добавлено позже.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;