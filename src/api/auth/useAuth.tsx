import { useState, useEffect, useContext, createContext, type ReactNode } from 'react';
import type { AuthContextType, User, UserResponse } from './types';
import { API_BASE_URL } from '../constants';
const LOGIN_ENDPOINT = '/auth/login';
const REGISTER_ENDPOINT = '/auth/register';
const CHECK_ENDPOINT = '/auth/check';
const LOGOUT_ENDPOINT = '/auth/logout';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getAuthToken = (): string | null => localStorage.getItem('authToken');
const setAuthToken = (token: string): void => localStorage.setItem('authToken', token);
const clearAuthToken = (): void => localStorage.removeItem('authToken');

const apiLogin = async (email: string, password: string): Promise<UserResponse> => {
  setTimeout(() => {}, 2000);
  // const res = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password }),
  // });

  // if (!res.ok) {
  //   const errorData = await res.json().catch(() => ({}));
  //   throw new Error(errorData.message || 'Login failed');
  // }

  // const data = await res.json();
  // setAuthToken(data.token);
  // return data.user;

  return mockUser;
};

const apiRegister = async (username: string, email: string, password: string): Promise<UserResponse> => {
  setTimeout(() => {}, 2000);
  // const res = await fetch(`${API_BASE_URL}${REGISTER_ENDPOINT}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username, email, password }),
  // });

  // if (!res.ok) {
  //   const errorData = await res.json().catch(() => ({}));
  //   throw new Error(errorData.message || 'Registration failed');
  // }

  // const data = await res.json();
  // setAuthToken(data.token);
  // return data.user;

  return mockUser;
};

// Mock user for development
const mockUser: UserResponse = {
  id: 'mock-user-id',
  username: 'MockUser',
  email: 'mock@example.com',
  phone: '+1234567890',
  icon_url: '',
  registered_at: new Date().toISOString(),
  description: 'Mock user for development',
  role: 'User',
  statistic: undefined
};

const apiCheckAuth = async (): Promise<UserResponse | null> => {
  setTimeout(() => {}, 2000);
  // const token = getAuthToken();
  // if (!token) return null;

  // const res = await fetch(`${API_BASE_URL}${CHECK_ENDPOINT}`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });

  // if (!res.ok) {
  //   clearAuthToken();
  //   return null;
  // }

  // const data = await res.json();
  // return data.user;

  return mockUser;
};

const apiLogout = async (): Promise<void> => {
  const token = getAuthToken();
  if (!token) return;

  try {
    await fetch(`${API_BASE_URL}${LOGOUT_ENDPOINT}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  } finally {
    clearAuthToken();
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await apiLogin(email, password);

      const user: User = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        iconUrl: userData.icon_url,
        registeredAt: userData.registered_at,
        description: userData.description,
        role: userData.role
      }

      setUser(user);
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const userData = await apiRegister(username, email, password);

      const user: User = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        iconUrl: userData.icon_url,
        registeredAt: userData.registered_at,
        description: userData.description,
        role: userData.role
      }

      setUser(user);
    } catch (error) {
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const check = async () => {
    setLoading(true);
    try {
      const userData = await apiCheckAuth();

      const user: User | null = userData ? {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        iconUrl: userData.icon_url,
        registeredAt: userData.registered_at,
        description: userData.description,
        role: userData.role
      } : null;

      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, check, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};