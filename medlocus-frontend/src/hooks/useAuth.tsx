'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authApi } from '@/src/services/api';
import type { User, LoginRequest } from '@/src/services/api/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing auth on mount
    const token = sessionStorage.getItem('auth_token');
    const storedUser = sessionStorage.getItem('auth_user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Invalid stored user, clear it
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const credentials: LoginRequest = { email, password };
      const response = await authApi.login(credentials);
      
      // Store token and user
      sessionStorage.setItem('auth_token', response.token);
      sessionStorage.setItem('auth_user', JSON.stringify(response.user));
      
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


