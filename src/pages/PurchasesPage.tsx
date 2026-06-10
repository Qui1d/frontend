import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { getMyOrders } from '../api/orderApi';
import { useAuth } from '../hooks/useAuth';

import type { Order } from '../api/orderApi';

const PurchasesPage = () => {
  const { isAuthenticated, user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadOrders = async () => {
      if (!isAuthenticated) {
        setOrders([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        setOrders([]);

        const loadedOrders = await getMyOrders();

        setOrders(loadedOrders);
      } catch (error) {
        setOrders([]);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Не удалось загрузить покупки');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadOrders();
  }, [isAuthenticated, user?.id]);

  const purchasedItems = useMemo(() => {
    return orders.flatMap((order) =>
      order.items.map((item) => ({
        ...item,
        orderId: order.id,
        createdAt: order.createdAt,
      }))
    );
  }, [orders]);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="page-stack">
      <section className="banner banner--small">
        <div>
          <p className="banner__eyebrow">LIBRARY</p>
          <h1>Мои покупки</h1>
          <p>
            Здесь отображаются только покупки текущего аккаунта и его личные
            ключи активации.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-header">
          <h2>Купленные игры</h2>
        </div>

        {isLoading && (
          <div className="empty-state">
            Загрузка покупок...
          </div>
        )}

        {!isLoading && error && (
          <div className="empty-state">
            {error}
          </div>
        )}

        {!isLoading && !error && purchasedItems.length === 0 && (
          <div className="empty-state">
            <p>На этом аккаунте пока нет покупок.</p>

            <Link to="/catalog" className="primary-btn">
              Перейти в каталог
            </Link>
          </div>
        )}

        {!isLoading && !error && purchasedItems.length > 0 && (
          <div className="purchases-list">
            {purchasedItems.map((item) => (
              <article className="purchase-card" key={item.id}>
                <div className="purchase-card__main">
                  <h3>{item.productName}</h3>

                  <p>
                    Заказ #{item.orderId} ·{' '}
                    {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                  </p>

                  <p>Цена: ${item.unitPrice}</p>
                </div>

                <div className="purchase-card__key">
                  <span>Личный ключ активации</span>

                  <strong>
                    {item.gameKey || 'Ключ не был сгенерирован'}
                  </strong>
                </div>

                <button
                  className="primary-btn purchase-card__button"
                  type="button"
                  disabled={!item.gameKey}
                  onClick={() => {
                    alert(
                      `Инструкция по использованию:\n\n1. Открой Steam / Epic Games / платформу игры.\n2. Найди раздел активации ключа.\n3. Введи ключ: ${item.gameKey}\n4. Подтверди активацию.`
                    );
                  }}
                >
                  Инструкция по использованию
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PurchasesPage;