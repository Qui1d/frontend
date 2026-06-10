import { apiRequest } from './apiClient';

export type OrderStatus = 'Pending' | 'Paid' | 'Completed' | 'Cancelled';

interface OrderItemFromApi {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  gameKey?: string | null;
  GameKey?: string | null;
}

interface OrderFromApi {
  id: number;
  userId: number;
  createdAt: string;
  status: number | string;
  totalAmount: number;
  items: OrderItemFromApi[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  gameKey: string;
}

export interface Order {
  id: number;
  userId: number;
  createdAt: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
}

function mapOrderStatus(status: number | string): OrderStatus {
  if (status === 1 || status === 'Paid') {
    return 'Paid';
  }

  if (status === 2 || status === 'Completed') {
    return 'Completed';
  }

  if (status === 3 || status === 'Cancelled') {
    return 'Cancelled';
  }

  return 'Pending';
}

function mapOrderFromApi(order: OrderFromApi): Order {
  return {
    id: order.id,
    userId: order.userId,
    createdAt: order.createdAt,
    status: mapOrderStatus(order.status),
    totalAmount: Number(order.totalAmount),
    items: order.items.map((item) => ({
      id: item.id,
      orderId: item.orderId,
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      gameKey: item.gameKey || item.GameKey || '',
    })),
  };
}

export async function checkoutOrder(): Promise<Order> {
  const order = await apiRequest<OrderFromApi>('/Order/checkout', {
    method: 'POST',
  });

  return mapOrderFromApi(order);
}

export async function getMyOrders(): Promise<Order[]> {
  const orders = await apiRequest<OrderFromApi[]>('/Order/my');

  return orders.map(mapOrderFromApi);
}