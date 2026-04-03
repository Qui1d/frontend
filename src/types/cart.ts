import type { Product } from './product';

export interface CartItemType {
  product: Product;
  quantity: number;
}