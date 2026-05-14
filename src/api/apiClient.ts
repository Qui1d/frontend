const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5033/api';

const AUTH_TOKEN_KEY = 'sky-vision-auth-token';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestOptions {
  method?: RequestMethod;
  body?: unknown;
  token?: string | null;
}

function getSavedToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, token } = options;

  const authToken = token ?? getSavedToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = 'Ошибка при запросе к серверу';

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        errorMessage = errorData.message;
      }

      if (errorData?.Message) {
        errorMessage = errorData.Message;
      }
    } catch {
      errorMessage = `Ошибка сервера: ${response.status}`;
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
}