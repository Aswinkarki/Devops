import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import api from '../services/api'; // use single api

interface User {
  username: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');

    if (accessToken && username && userId) {
      setUser({ username, userId });
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post('users/login/', {
        user_name: username,
        password: password,
      });

      const { access_token, refresh_token, user_id } = response.data;

      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);
      localStorage.setItem('username', username);
      localStorage.setItem('userId', user_id);

      setUser({ username, userId: user_id });
      setIsAuthenticated(true);
    } catch (error: any) {
      logout();
      throw new Error(error.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
    }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
