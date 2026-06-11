import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, name: string) => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password123') {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: (email: string, password: string, name: string) => {
        if (mockUsers.find(u => u.email === email)) {
          return false;
        }
        const newUser: User = {
          id: String(mockUsers.length + 1),
          email,
          name,
          role: 'user',
          createdAt: new Date().toISOString()
        };
        mockUsers.push(newUser as any);
        set({ user: newUser, isAuthenticated: true });
        return true;
      }
    }),
    {
      name: 'user-storage'
    }
  )
);
