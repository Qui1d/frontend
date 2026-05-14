import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { checkoutOrder } from '../api/orderApi';
import type { Order } from '../api/orderApi';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';

type PaymentMethod = 'card' | 'paypal' | 'crypto';

const CheckoutPage = () => {
  const { isAuthenticated, user } = useAuth();
  const { cartItems, totalPrice, totalCount, clearCart } = useCart();

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [customerName, setCustomerName] = useState(user?.username ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const previewItems = useMemo(() => cartItems.slice(0, 3), [cartItems]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const order = await checkoutOrder();
      setCreatedOrder(order);
      await clearCart();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Не удалось оформить заказ'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (createdOrder) {
    return (
      <div className="page-stack">
        <section className="page-section">
          <div className="checkout-success">
            <div className="checkout-success__icon">✓</div>
            <h1>Заказ успешно оформлен</h1>
            <p>
              Спасибо за покупку! Заказ <strong>#{createdOrder.id}</strong> был
              создан и сохранён в базе данных.
            </p>

            <div className="checkout-success__meta">
              <div className="checkout-success__meta-item">
                <span>Статус</span>
                <strong>{String(createdOrder.status)}</strong>
              </div>

              <div className="checkout-success__meta-item">
                <span>Товаров</span>
                <strong>{createdOrder.items.length}</strong>
              </div>

              <div className="checkout-success__meta-item">
                <span>Сумма</span>
                <strong>${createdOrder.totalAmount.toFixed(2)}</strong>
              </div>
            </div>

            <div className="checkout-success__actions">
              <Link className="button button--primary" to="/purchases">
                Мои покупки
              </Link>
              <Link className="button button--secondary" to="/catalog">
                Вернуться в каталог
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="page-stack">
        <section className="page-section">
          <div className="empty-state">
            <h1>Нет товаров для оформления</h1>
            <p>Сначала добавь товары в корзину.</p>
            <Link className="button button--primary" to="/catalog">
              Перейти в каталог
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="page-section checkout-page">
        <div className="checkout-header">
          <div>
            <h1>Оформление заказа</h1>
            <p className="checkout-header__text">
              Проверь данные заказа, выбери способ оплаты и подтверди покупку.
            </p>
          </div>
        </div>

        <div className="checkout-layout">
          <form className="checkout-card checkout-card--form" onSubmit={handleSubmit}>
            <div className="checkout-card__title-block">
              <h2>Контактные данные</h2>
              <p>Эти данные нужны для подтверждения и обработки заказа.</p>
            </div>

            <div className="checkout-form-grid">
              <label className="checkout-field">
                <span>Имя</span>
                <input
                  type="text"
                  placeholder="Введите имя"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </label>

              <label className="checkout-field">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="checkout-field">
                <span>Телефон</span>
                <input
                  type="tel"
                  placeholder="+380 ..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </label>

              <label className="checkout-field">
                <span>Промокод</span>
                <input type="text" placeholder="Если есть, введи промокод" />
              </label>
            </div>

            <div className="checkout-card__title-block checkout-card__title-block--small">
              <h2>Способ оплаты</h2>
              <p>Выбери удобный способ оплаты.</p>
            </div>

            <div className="checkout-payment-grid">
              <label
                className={`checkout-payment-option ${
                  paymentMethod === 'card' ? 'checkout-payment-option--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <div>
                  <strong>💳 Банковская карта</strong>
                  <span>Visa / MasterCard</span>
                </div>
              </label>

              <label
                className={`checkout-payment-option ${
                  paymentMethod === 'paypal' ? 'checkout-payment-option--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <div>
                  <strong>🅿️ PayPal</strong>
                  <span>Быстрая онлайн-оплата</span>
                </div>
              </label>

              <label
                className={`checkout-payment-option ${
                  paymentMethod === 'crypto' ? 'checkout-payment-option--active' : ''
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="crypto"
                  checked={paymentMethod === 'crypto'}
                  onChange={() => setPaymentMethod('crypto')}
                />
                <div>
                  <strong>₿ Криптовалюта</strong>
                  <span>USDT / BTC / ETH</span>
                </div>
              </label>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              className="button button--primary checkout-submit"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Оформление...' : 'Подтвердить заказ'}
            </button>
          </form>

          <aside className="checkout-card checkout-card--summary">
            <div className="checkout-card__title-block">
              <h2>Сумма заказа</h2>
              <p>Краткая информация по товарам в корзине.</p>
            </div>

            <div className="checkout-summary">
              <div className="checkout-summary__row">
                <span>Товаров</span>
                <strong>{totalCount}</strong>
              </div>

              <div className="checkout-summary__row">
                <span>Позиций</span>
                <strong>{cartItems.length}</strong>
              </div>

              <div className="checkout-summary__row">
                <span>Скидка</span>
                <strong>$0.00</strong>
              </div>
            </div>

            <div className="checkout-preview">
              {previewItems.map((item) => (
                <div className="checkout-preview__item" key={item.product.id}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="checkout-preview__image"
                  />

                  <div className="checkout-preview__content">
                    <strong>{item.product.title}</strong>
                    <span>
                      {item.quantity} × ${item.product.price.toFixed(2)}
                    </span>
                  </div>

                  <div className="checkout-preview__price">
                    ${(item.quantity * item.product.price).toFixed(2)}
                  </div>
                </div>
              ))}

              {cartItems.length > 3 && (
                <p className="checkout-preview__more">
                  И ещё {cartItems.length - 3} товар(а)
                </p>
              )}
            </div>

            <div className="checkout-total">
              <span>Итого</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;