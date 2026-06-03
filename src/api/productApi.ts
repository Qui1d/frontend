import { apiRequest } from './apiClient';
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
  isNew: boolean;
  isPopular: boolean;
  isUpcoming: boolean;
  createdAt: string;
}

export interface ProductCreateRequest {
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
  isNew: boolean;
  isPopular: boolean;
  isUpcoming: boolean;
}

export interface ProductUpdateRequest extends ProductCreateRequest {}

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

export async function getProducts(): Promise<Product[]> {
  const products = await apiRequest<ProductFromApi[]>('/Product/all');

  return products.map(mapProductFromApi);
}

export async function getProductById(id: number): Promise<Product> {
  const product = await apiRequest<ProductFromApi>(`/Product/${id}`);

  return mapProductFromApi(product);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const product = await apiRequest<ProductFromApi>(
    `/Product/slug/${encodeURIComponent(slug)}`
  );

  return mapProductFromApi(product);
}

export async function createProduct(
  product: ProductCreateRequest
): Promise<Product> {
  const createdProduct = await apiRequest<ProductFromApi>('/Product/create', {
    method: 'POST',
    body: product,
  });

  return mapProductFromApi(createdProduct);
}

export async function updateProduct(
  id: number,
  product: ProductUpdateRequest
): Promise<Product> {
  const updatedProduct = await apiRequest<ProductFromApi>(`/Product/${id}`, {
    method: 'PUT',
    body: product,
  });

  return mapProductFromApi(updatedProduct);
}

export async function deleteProduct(id: number): Promise<void> {
  await apiRequest<void>(`/Product/${id}`, {
    method: 'DELETE',
  });
}