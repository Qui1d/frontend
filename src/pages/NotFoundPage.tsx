import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="card empty-state">
      <h1>404</h1>
      <p>Страница не найдена</p>
      <Link to="/" className="primary-btn inline-btn">Вернуться на главную</Link>
    </div>
  );
};

export default NotFoundPage;