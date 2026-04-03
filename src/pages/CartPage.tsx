import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="card empty-state">
        <h1>Корзина пуста</h1>
        <p>Добавь товары из каталога, чтобы оформить заказ.</p>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <section className="cart-layout__items page-stack">
        <h1>Корзина</h1>
        {cartItems.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </section>

      <aside className="cart-layout__summary">
        <OrderSummary />
      </aside>
    </div>
  );
};

export default CartPage;