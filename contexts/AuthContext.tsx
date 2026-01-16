// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, getProfile, getAccessToken, clearTokens } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
  mustChangePassword: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; mustChangePassword?: boolean }>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = getAccessToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const result = await getProfile();
      if (result.success && result.data) {
        setUser(result.data);
      } else {
        clearTokens();
      }
    } catch (e) {
      clearTokens();
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const result = await apiLogin(email, password);
    
    if (result.success && result.data) {
      setUser(result.data.user);
      return { 
        success: true, 
        mustChangePassword: result.data.user.mustChangePassword 
      };
    }

    return { success: false, error: result.error || '登入失敗' };
  }

  async function logout() {
    await apiLogout();
    setUser(null);
  }

  function updateUser(updatedUser: User) {
    setUser(updatedUser);
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
