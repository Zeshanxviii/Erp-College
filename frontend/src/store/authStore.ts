import { create } from 'zustand';

// Reusing the User interface from AuthContext
export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
