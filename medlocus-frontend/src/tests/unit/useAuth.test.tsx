import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/src/hooks/useAuth';
import { authApi } from '@/src/services/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Mock the API
jest.mock('@/src/services/api', () => ({
  authApi: {
    login: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('should initialize with no user', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should login successfully', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    const mockToken = 'test-token';

    (authApi.login as jest.Mock).mockResolvedValue({
      token: mockToken,
      user: mockUser,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    expect(sessionStorage.getItem('auth_token')).toBe(mockToken);
  });

  it('should logout successfully', async () => {
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    sessionStorage.setItem('auth_token', 'test-token');
    sessionStorage.setItem('auth_user', JSON.stringify(mockUser));

    (authApi.login as jest.Mock).mockResolvedValue({
      token: 'test-token',
      user: mockUser,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(sessionStorage.getItem('auth_token')).toBeNull();
  });
});


