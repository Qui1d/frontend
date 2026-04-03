import type { CartItemType } from '../types/cart';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, changeQuantity } = useCart();

  return (
    <div className="cart-item card">
      <img src={item.product.image} alt={item.product.title} className="cart-item__image" />

      <div className="cart-item__content">
        <h3>{item.product.title}</h3>
        <p>{item.product.platform} • {item.product.region}</p>
        <p className="price">{formatPrice(item.product.price)}</p>
      </div>

      <div className="cart-item__controls">
        <input
          type="number"
          min={1}
          value={item.quantity}
          onChange={(e) => changeQuantity(item.product.id, Number(e.target.value))}
        />
        <button className="danger-btn" onClick={() => removeFromCart(item.product.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default CartItem;