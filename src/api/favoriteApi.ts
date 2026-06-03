import { apiRequest } from './apiClient';

export interface FavoriteFromApi {
  id: number;
  userId: number;
  productId: number;
  addedAt: string;
}

export async function getFavorites(): Promise<FavoriteFromApi[]> {
  return apiRequest<FavoriteFromApi[]>('/Favorite');
}

export async function addFavorite(productId: number): Promise<FavoriteFromApi> {
  return apiRequest<FavoriteFromApi>(`/Favorite/${productId}`, {
    method: 'POST',
  });
}

export async function removeFavorite(productId: number): Promise<void> {
  await apiRequest<void>(`/Favorite/${productId}`, {
    method: 'DELETE',
  });
}