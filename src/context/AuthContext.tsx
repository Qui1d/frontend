import { createContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import type { AuthUser, LoginRequest, RegisterRequest } from '../api/authApi';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_USER_KEY = 'sky-vision-auth-user';
const AUTH_TOKEN_KEY = 'sky-vision-auth-token';

function getSavedToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function getSavedUser(): AuthUser | null {
  const savedToken = getSavedToken();

  if (!savedToken) {
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }

  const savedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!savedUser) {
    return null;
  }

  try {
    return JSON.parse(savedUser) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getSavedUser());
  const [token, setToken] = useState<string | null>(() => getSavedToken());

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  }, [token]);

  const login = async (data: LoginRequest) => {
    const authResponse = await loginUser(data);

    setUser(authResponse.user);
    setToken(authResponse.token);
  };

  const register = async (data: RegisterRequest) => {
    const authResponse = await registerUser(data);

    setUser(authResponse.user);
    setToken(authResponse.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => {
    return {
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isAdmin: user?.role === 'Admin',
      login,
      register,
      logout,
    };
  }, [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};