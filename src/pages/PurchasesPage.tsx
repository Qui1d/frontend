import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { getMyOrders } from '../api/orderApi';
import type { Order } from '../api/orderApi';
import { useAuth } from '../hooks/useAuth';

function formatStatus(status: Order['status']) {
  switch (status) {
    case 'Paid':
      return 'Оплачен';
    case 'Completed':
      return 'Завершён';
    case 'Cancelled':
      return 'Отменён';
    default:
      return 'В ожидании';
  }
}

const PurchasesPage = () => {
  const { isAuthenticated } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      try {
        const loadedOrders = await getMyOrders();
        setOrders(loadedOrders);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Не удалось загрузить покупки'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (isLoading) {
    return (
      <div className="page-stack">
        <section className="page-section">
          <h1>Мои покупки</h1>
          <p>Загрузка покупок...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-stack">
        <section className="page-section">
          <h1>Мои покупки</h1>
          <p className="form-error">{error}</p>
        </section>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="page-stack">
        <section className="page-section">
          <div className="empty-state">
            <h1>Мои покупки</h1>
            <p>У тебя пока нет оформленных заказов.</p>
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
      <section className="page-section">
        <div className="section-header">
          <h1>Мои покупки</h1>
          <p>История оформленных заказов и приобретённых игровых ключей.</p>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card__header">
                <div>
                  <h2>Заказ #{order.id}</h2>
                  <p>
                    {new Date(order.createdAt).toLocaleString('ru-RU')}
                  </p>
                </div>

                <div className="order-card__meta">
                  <span>{formatStatus(order.status)}</span>
                  <strong>${order.totalAmount.toFixed(2)}</strong>
                </div>
              </div>

              <div className="order-card__items">
                {order.items.map((item) => (
                  <div className="order-card__item" key={item.id}>
                    <div>
                      <strong>{item.productName}</strong>
                      <p>
                        Количество: {item.quantity} × $
                        {item.unitPrice.toFixed(2)}
                      </p>
                    </div>

                    <span>
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PurchasesPage;