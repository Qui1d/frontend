import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/formatPrice';

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
}

const OrderSummary = ({ showCheckoutButton = true }: OrderSummaryProps) => {
  const { totalPrice, totalCount } = useCart();

  return (
    <div className="card order-summary">
      <h3>Сумма заказа</h3>
      <p>Товаров: {totalCount}</p>
      <p className="order-summary__total">Итого: {formatPrice(totalPrice)}</p>
      {showCheckoutButton ? (
        <Link to="/checkout" className="primary-btn order-summary__button">
          Оформить заказ
        </Link>
      ) : null}
    </div>
  );
};

export default OrderSummary;