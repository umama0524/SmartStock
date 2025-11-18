import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState, LoginCredentials, User } from '../types';

// モックユーザーデータ
const MOCK_USERS = {
  admin: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    name: '管理者',
    role: 'admin' as const,
    createdAt: '2025-01-01T00:00:00Z',
  },
  inventory: {
    id: '2',
    username: 'inventory',
    email: 'inventory@example.com',
    name: '在庫 太郎',
    role: 'inventory' as const,
    createdAt: '2025-01-01T00:00:00Z',
  },
  purchase: {
    id: '3',
    username: 'purchase',
    email: 'purchase@example.com',
    name: '発注 花子',
    role: 'purchase' as const,
    createdAt: '2025-01-01T00:00:00Z',
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        // モック認証（本番はAPIコール）
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = MOCK_USERS[credentials.username as keyof typeof MOCK_USERS];
        
        if (!user || credentials.password !== 'password') {
          throw new Error('ユーザー名またはパスワードが正しくありません');
        }

        const token = 'mock-jwt-token-' + Math.random();

        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);