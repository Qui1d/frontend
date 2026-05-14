import { createContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { loginUser, registerUser } from '../api/authApi';
import type { AuthUser, LoginRequest, RegisterRequest } from '../api/authApi';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_USER_KEY = 'sky-vision-auth-user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem(AUTH_USER_KEY);

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser) as AuthUser;
    } catch {
      localStorage.removeItem(AUTH_USER_KEY);
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [user]);

  const login = async (data: LoginRequest) => {
    const loggedUser = await loginUser(data);
    setUser(loggedUser);
  };

  const register = async (data: RegisterRequest) => {
    const registeredUser = await registerUser(data);
    setUser(registeredUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo<AuthContextType>(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'Admin',
      login,
      register,
      logout,
    };
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};