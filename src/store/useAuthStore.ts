import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));

// Initialize listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().setUser(user);
});

// Demo Fallback: If using placeholder API Key, allow a mock login
export const mockLogin = async () => {
  const mockUser = {
    email: 'admin@careease.com',
    uid: 'demo-123',
  } as User;
  useAuthStore.getState().setUser(mockUser);
};
