import { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="auth-page">
      <div className="card auth-card">
        <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>

        <form className="auth-form-grid">
          {!isLogin ? (
            <div className="form-group">
              <label>Имя</label>
              <input type="text" placeholder="Введите имя" required />
            </div>
          ) : null}

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Введите email" required />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <input type="password" placeholder="Введите пароль" required />
          </div>

          <button className="primary-btn" type="submit">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
<button className="text-btn" onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
        </button>
      </div>
    </section>
  );
};

export default AuthPage;