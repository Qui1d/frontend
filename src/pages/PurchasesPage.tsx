import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { getMyOrders } from '../api/orderApi';
import { getProducts } from '../api/productApi';
import { useAuth } from '../hooks/useAuth';

import type { Order } from '../api/orderApi';
import type { Product } from '../types/product';

type PurchaseItemView = {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  gameKey: string;
  createdAt: string;
  image?: string;
  platform?: string;
  region?: string;
};

const styles: Record<string, CSSProperties> = {
  layout: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 360px',
    gap: '28px',
    alignItems: 'start',
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  card: {
    display: 'grid',
    gridTemplateColumns: '180px minmax(0, 1fr) 340px',
    alignItems: 'center',
    gap: '22px',
    padding: '22px',
    border: '1px solid rgba(148, 163, 184, 0.16)',
    borderRadius: '24px',
    background: 'rgba(22, 24, 31, 0.96)',
    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.22)',
  },

  image: {
    width: '180px',
    height: '105px',
    borderRadius: '16px',
    objectFit: 'cover',
    border: '1px solid rgba(148, 163, 184, 0.18)',
  },

  info: {
    minWidth: 0,
  },

  title: {
    margin: '0 0 10px',
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 900,
  },

  meta: {
    margin: '0 0 12px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 700,
  },

  order: {
    margin: '0 0 14px',
    color: '#a8adbd',
    fontSize: '14px',
  },

  price: {
    display: 'block',
    color: '#ffffff',
    fontSize: '30px',
    fontWeight: 900,
  },

  keyArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: 0,
  },

  keyLabel: {
    color: '#a8adbd',
    fontSize: '13px',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },

  keyBoxHidden: {
    padding: '14px 16px',
    border: '1px dashed rgba(148, 163, 184, 0.38)',
    borderRadius: '16px',
    background: 'rgba(15, 23, 42, 0.48)',
    color: '#a8adbd',
    fontSize: '17px',
    fontWeight: 900,
    letterSpacing: '0.08em',
    textAlign: 'center',
  },

  keyBoxVisible: {
    padding: '14px 16px',
    border: '1px solid rgba(34, 197, 94, 0.42)',
    borderRadius: '16px',
    background: 'rgba(34, 197, 94, 0.12)',
    color: '#bbf7d0',
    fontSize: '17px',
    fontWeight: 900,
    letterSpacing: '0.08em',
    textAlign: 'center',
    wordBreak: 'break-word',
  },

  keyBoxEmpty: {
    padding: '14px 16px',
    border: '1px solid rgba(239, 68, 68, 0.35)',
    borderRadius: '16px',
    background: 'rgba(239, 68, 68, 0.08)',
    color: '#fca5a5',
    fontSize: '14px',
    fontWeight: 800,
    textAlign: 'center',
  },

  actions: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },

  showButton: {
    height: '48px',
    padding: '0 18px',
    border: '1px solid rgba(111, 140, 255, 0.35)',
    borderRadius: '14px',
    background: 'rgba(111, 140, 255, 0.14)',
    color: '#8ea2ff',
    fontFamily: 'inherit',
    fontSize: '15px',
    fontWeight: 900,
    cursor: 'pointer',
  },

  summary: {
    position: 'sticky',
    top: '24px',
    padding: '26px',
    border: '1px solid rgba(148, 163, 184, 0.16)',
    borderRadius: '24px',
    background: 'rgba(22, 24, 31, 0.96)',
    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.22)',
  },

  summaryTitle: {
    margin: '0 0 24px',
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 900,
  },

  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '14px',
    marginBottom: '16px',
    color: '#ffffff',
  },

  summaryLabel: {
    color: '#a8adbd',
    fontWeight: 700,
  },

  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '14px',
    margin: '24px 0',
    paddingTop: '20px',
    borderTop: '1px solid rgba(148, 163, 184, 0.18)',
  },

  summaryTotalValue: {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 900,
  },
};

const PurchasesPage = () => {
  const { isAuthenticated, user } = useAuth();

  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [revealedKeys, setRevealedKeys] = useState<Record<number, boolean>>({});

  const storageKey = `revealed_purchase_keys_${user?.id ?? 'guest'}`;

  useEffect(() => {
    if (!user?.id) {
      setRevealedKeys({});
      return;
    }

    const savedKeys = localStorage.getItem(storageKey);

    if (!savedKeys) {
      setRevealedKeys({});
      return;
    }

    try {
      setRevealedKeys(JSON.parse(savedKeys));
    } catch {
      setRevealedKeys({});
    }
  }, [storageKey, user?.id]);

  useEffect(() => {
    const loadPurchases = async () => {
      if (!isAuthenticated) {
        setOrders([]);
        setProducts([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError('');
        setOrders([]);
        setProducts([]);

        const [loadedOrders, loadedProducts] = await Promise.all([
          getMyOrders(),
          getProducts(),
        ]);

        setOrders(loadedOrders);
        setProducts(loadedProducts);
      } catch (error) {
        setOrders([]);
        setProducts([]);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Не удалось загрузить покупки');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadPurchases();
  }, [isAuthenticated, user?.id]);

  const purchasedItems = useMemo<PurchaseItemView[]>(() => {
    const productsMap = new Map<number, Product>(
      products.map((product) => [product.id, product])
    );

    return orders.flatMap((order) =>
      order.items.map((item) => {
        const product = productsMap.get(item.productId);

        return {
          ...item,
          orderId: order.id,
          createdAt: order.createdAt,
          image: product?.image,
          platform: product?.platform,
          region: product?.region,
        };
      })
    );
  }, [orders, products]);

  const totalSpent = purchasedItems.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const openedKeysCount = purchasedItems.filter(
    (item) => revealedKeys[item.id]
  ).length;

  const revealKey = (itemId: number) => {
    const updatedKeys = {
      ...revealedKeys,
      [itemId]: true,
    };

    setRevealedKeys(updatedKeys);
    localStorage.setItem(storageKey, JSON.stringify(updatedKeys));
  };

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

        {isLoading && <div className="empty-state">Загрузка покупок...</div>}

        {!isLoading && error && <div className="empty-state">{error}</div>}

        {!isLoading && !error && purchasedItems.length === 0 && (
          <div className="empty-state">
            <p>На этом аккаунте пока нет покупок.</p>

            <Link to="/catalog" className="primary-btn">
              Перейти в каталог
            </Link>
          </div>
        )}

        {!isLoading && !error && purchasedItems.length > 0 && (
          <div style={styles.layout}>
            <div style={styles.list}>
              {purchasedItems.map((item) => {
                const isKeyVisible = !!revealedKeys[item.id];

                return (
                  <article style={styles.card} key={item.id}>
                    <img
                      src={item.image || 'https://placehold.co/320x180?text=Game'}
                      alt={item.productName}
                      style={styles.image}
                    />

                    <div style={styles.info}>
                      <h3 style={styles.title}>{item.productName}</h3>

                      <p style={styles.meta}>
                        {[item.platform, item.region].filter(Boolean).join(' • ') ||
                          'Digital key'}
                      </p>

                      <p style={styles.order}>
                        Заказ #{item.orderId} ·{' '}
                        {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                      </p>

                      <strong style={styles.price}>${item.unitPrice}</strong>
                    </div>

                    <div style={styles.keyArea}>
                      <span style={styles.keyLabel}>Ключ активации</span>

                      {item.gameKey ? (
                        isKeyVisible ? (
                          <div style={styles.keyBoxVisible}>
                            {item.gameKey}
                          </div>
                        ) : (
                          <div style={styles.keyBoxHidden}>
                            •••••-•••••-•••••
                          </div>
                        )
                      ) : (
                        <div style={styles.keyBoxEmpty}>
                          Ключ не был сгенерирован
                        </div>
                      )}

                      <div style={styles.actions}>
                        {!isKeyVisible && item.gameKey && (
                          <button
                            style={styles.showButton}
                            type="button"
                            onClick={() => revealKey(item.id)}
                          >
                            Показать ключ
                          </button>
                        )}

                        <button
                          className="primary-btn"
                          type="button"
                          disabled={!item.gameKey}
                          onClick={() => {
                            alert(
                              `Инструкция по использованию:\n\n1. Открой Steam / Epic Games / нужную платформу.\n2. Найди раздел активации ключа.\n3. Введи ключ: ${item.gameKey}\n4. Подтверди активацию.`
                            );
                          }}
                        >
                          Инструкция
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside style={styles.summary}>
              <h3 style={styles.summaryTitle}>Мои ключи</h3>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Покупок:</span>
                <strong>{purchasedItems.length}</strong>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Открыто ключей:</span>
                <strong>{openedKeysCount}</strong>
              </div>

              <div style={styles.summaryTotal}>
                <span style={styles.summaryLabel}>Потрачено:</span>
                <strong style={styles.summaryTotalValue}>
                  ${totalSpent.toFixed(2)}
                </strong>
              </div>

              <Link to="/catalog" className="primary-btn">
                Вернуться в каталог
              </Link>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
};

export default PurchasesPage;