import { apiRequest } from './apiClient';

export type UserRole = 'User' | 'Admin';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt?: string;
}

interface AuthUserFromApi {
  id: number;
  username: string;
  email: string;
  role: number | string;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

function mapUserFromApi(user: AuthUserFromApi): AuthUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role === 1 || user.role === 'Admin' ? 'Admin' : 'User',
    createdAt: user.createdAt,
  };
}

export async function loginUser(data: LoginRequest): Promise<AuthUser> {
  const user = await apiRequest<AuthUserFromApi>('/Auth/login', {
    method: 'POST',
    body: data,
  });

  return mapUserFromApi(user);
}

export async function registerUser(data: RegisterRequest): Promise<AuthUser> {
  const user = await apiRequest<AuthUserFromApi>('/Auth/register', {
    method: 'POST',
    body: data,
  });

  return mapUserFromApi(user);
}