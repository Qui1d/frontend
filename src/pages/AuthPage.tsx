import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setError('');
  };

  const handleModeChange = () => {
    setIsLogin((prev) => !prev);
    resetForm();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password.trim()) {
      setError('Введите email и пароль');
      return;
    }

    if (!isLogin && !trimmedUsername) {
      setError('Введите имя пользователя');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (isLogin) {
        await login({
          email: trimmedEmail,
          password,
        });

        showToast('Вы успешно вошли в аккаунт');
      } else {
        await register({
          username: trimmedUsername,
          email: trimmedEmail,
          password,
        });

        showToast('Аккаунт успешно создан');
      }

      navigate('/profile');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Не удалось выполнить авторизацию');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-stack">
      <section className="banner banner--small">
        <div>
          <p className="banner__eyebrow">
            {isLogin ? 'ВХОД' : 'РЕГИСТРАЦИЯ'}
          </p>

          <h1>{isLogin ? 'Вход в аккаунт' : 'Создание аккаунта'}</h1>

          <p>
            {isLogin
              ? 'Войдите в аккаунт, чтобы управлять покупками, корзиной и избранным.'
              : 'Создайте аккаунт Sky Vision Store для покупок цифровых игровых ключей.'}
          </p>
        </div>
      </section>

      <section className="auth-section">
        <div className="auth-card">
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>

            {!isLogin && (
              <div className="auth-form__field">
                <label htmlFor="username">Имя пользователя</label>
                <input
                  id="username"
                  className="auth-form__input"
                  type="text"
                  placeholder="Введите имя пользователя"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            )}

            <div className="auth-form__field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="auth-form__input"
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="auth-form__field">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                className="auth-form__input"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            {error && <div className="auth-form__error">{error}</div>}

            <button className="primary-btn auth-form__submit" type="submit" disabled={loading}>
              {loading
                ? 'Подождите...'
                : isLogin
                  ? 'Войти'
                  : 'Зарегистрироваться'}
            </button>

            <button
              type="button"
              className="secondary-btn auth-form__switch"
              onClick={handleModeChange}
              disabled={loading}
            >
              {isLogin
                ? 'Нет аккаунта? Зарегистрироваться'
                : 'Уже есть аккаунт? Войти'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;