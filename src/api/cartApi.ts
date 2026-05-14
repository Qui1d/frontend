import { apiRequest } from './apiClient';
import type { CartItemType } from '../types/cart';
import type { Product } from '../types/product';

interface ProductFromApi {
  id: number;
  title: string;
  slug: string;
  platform: string;
  genre: string;
  price: number;
  oldPrice?: number | null;
  discount?: number | null;
  image: string;
  recommendedImage?: string | null;
  region: string;
  description: string;
  requirements: string;
  isNew?: boolean;
  isPopular?: boolean;
  isUpcoming?: boolean;
}

interface CartItemFromApi {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: ProductFromApi;
}

export interface AddCartItemRequest {
  productId: number;
  quantity: number;
}

function mapProductFromApi(product: ProductFromApi): Product {
  return {
    id: product.id,
    title: product.title,
    slug: product.slug,
    platform: product.platform,
    genre: product.genre,
    price: Number(product.price),
    oldPrice: product.oldPrice ?? undefined,
    discount: product.discount ?? undefined,
    image: product.image,
    recommendedImage: product.recommendedImage ?? undefined,
    region: product.region,
    description: product.description,
    requirements: product.requirements
      ? product.requirements.split(/\r?\n/).filter(Boolean)
      : [],
    isNew: product.isNew,
    isPopular: product.isPopular,
    isUpcoming: product.isUpcoming,
  };
}

function mapCartItemFromApi(item: CartItemFromApi): CartItemType {
  return {
    product: mapProductFromApi(item.product),
    quantity: item.quantity,
  };
}

export async function getCart(): Promise<CartItemType[]> {
  const cartItems = await apiRequest<CartItemFromApi[]>('/Cart');

  return cartItems.map(mapCartItemFromApi);
}

export async function addCartItem(
  data: AddCartItemRequest
): Promise<CartItemType> {
  const cartItem = await apiRequest<CartItemFromApi>('/Cart/add', {
    method: 'POST',
    body: data,
  });

  return mapCartItemFromApi(cartItem);
}

export async function updateCartItem(
  productId: number,
  quantity: number
): Promise<CartItemType> {
  const cartItem = await apiRequest<CartItemFromApi>(
    `/Cart/${productId}?quantity=${quantity}`,
    {
      method: 'PUT',
    }
  );

  return mapCartItemFromApi(cartItem);
}

export async function removeCartItem(productId: number): Promise<void> {
  await apiRequest<void>(`/Cart/${productId}`, {
    method: 'DELETE',
  });
}

export async function clearUserCart(): Promise<void> {
  await apiRequest<void>('/Cart/clear', {
    method: 'DELETE',
  });
}