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

interface AuthResponseFromApi {
  token: string;
  user: AuthUserFromApi;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
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

function mapAuthResponseFromApi(response: AuthResponseFromApi): AuthResponse {
  return {
    token: response.token,
    user: mapUserFromApi(response.user),
  };
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponseFromApi>('/Auth/login', {
    method: 'POST',
    body: data,
  });

  return mapAuthResponseFromApi(response);
}

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponseFromApi>('/Auth/register', {
    method: 'POST',
    body: data,
  });

  return mapAuthResponseFromApi(response);
}