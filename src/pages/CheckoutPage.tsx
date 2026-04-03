import { useState } from 'react';
import type { FormEvent } from 'react';
import { useCart } from '../hooks/useCart';
import OrderSummary from '../components/OrderSummary';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="card empty-state">
        <h1>Заказ успешно оформлен</h1>
        <p>Это демонстрационный frontend, поэтому оплата не выполняется реально.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="card empty-state">
        <h1>Нет товаров для оформления</h1>
        <p>Сначала добавь товары в корзину.</p>
      </div>
    );
  }

  return (
    <div className="checkout-layout">
      <form className="card checkout-form" onSubmit={handleSubmit}>
        <h1>Оформление заказа</h1>

        <div className="form-group">
          <label>Имя</label>
          <input type="text" placeholder="Введите имя" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Введите email" required />
        </div>

        <div className="form-group">
          <label>Телефон</label>
          <input type="text" placeholder="Введите телефон" required />
        </div>

        <div className="form-group">
          <label>Способ оплаты</label>
          <select required>
            <option value="">Выберите способ оплаты</option>
            <option value="card">Банковская карта</option>
            <option value="paypal">PayPal</option>
            <option value="crypto">Криптовалюта</option>
          </select>
        </div>

        <button className="primary-btn" type="submit">
          Подтвердить заказ
        </button>
      </form>

      <aside>
        <OrderSummary showCheckoutButton={false} />
      </aside>
    </div>
  );
};

export default CheckoutPage;