import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Reusing the User interface from AuthContext
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'faculty' | 'student';
}

// Extended user interface for admin
export interface AdminUser extends User {
  role: 'admin';
  permissions?: string[];
  lastLogin?: string;
}

// Extended user interface for faculty
export interface FacultyUser extends User {
  role: 'faculty';
  department?: string;
  subjects?: string[];
}

// Extended user interface for student
export interface StudentUser extends User {
  role: 'student';
  department?: string;
  year?: number;
  semester?: number;
}

// Union type for all user types
export type AuthenticatedUser = AdminUser | FacultyUser | StudentUser;

interface AuthState {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  error: string | null;
  
  // Actions
  login: (userData: AuthenticatedUser, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  updateUser: (updates: Partial<AuthenticatedUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    //@ts-ignore
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
      error: null,
      
      login: (userData: AuthenticatedUser, token: string) => {
        console.log('AuthStore: Logging in user:', userData);
        
        // Store token in localStorage for API calls
        localStorage.setItem('authToken', token);
        localStorage.setItem('userType', userData.role);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        set({ 
          user: userData, 
          isAuthenticated: true,
          isLoading: false,
          token,
          error: null
        });
        console.log('AuthStore: User logged in successfully');
      },
      
      logout: () => {
        console.log('AuthStore: Logging out user');
        
        // Clear localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
        localStorage.removeItem('userData');
        
        set({ 
          user: null, 
          isAuthenticated: false,
          isLoading: false,
          token: null,
          error: null
        });
        console.log('AuthStore: User logged out successfully');
      },
      
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      
      setError: (error: string | null) => {
        set({ error });
      },
      
      clearError: () => {
        set({ error: null });
      },
      
      updateUser: (updates: Partial<AuthenticatedUser>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null
        }));
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist non-sensitive data
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        console.log('AuthStore: Rehydrating from storage:', state);
        if (state?.user) {
          // Check if token exists in localStorage
          const token = localStorage.getItem('authToken');
          if (token) {
            state.token = token;
            state.isAuthenticated = true;
            console.log('AuthStore: User session restored from storage');
          } else {
            // Clear state if no valid token
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
          }
        }
      },
    }
  )
);

// Selector hooks for better performance
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

// Role-specific selectors
export const useAuthUserRole = () => useAuthStore((state) => state.user?.role);
export const useAuthIsAdmin = () => useAuthStore((state) => state.user?.role === 'admin');
export const useAuthIsFaculty = () => useAuthStore((state) => state.user?.role === 'faculty');
export const useAuthIsStudent = () => useAuthStore((state) => state.user?.role === 'student');

// Action hooks
export const useAuthLogin = () => useAuthStore((state) => state.login);
export const useAuthLogout = () => useAuthStore((state) => state.logout);
export const useAuthSetLoading = () => useAuthStore((state) => state.setLoading);
export const useAuthSetError = () => useAuthStore((state) => state.setError);
export const useAuthClearError = () => useAuthStore((state) => state.clearError);
export const useAuthUpdateUser = () => useAuthStore((state) => state.updateUser);

// Debug function to check store state
export const debugAuthStore = () => {
  const state = useAuthStore.getState();
  console.log('AuthStore Debug Info:', {
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    hasUser: !!state.user,
    userRole: state.user?.role,
    hasToken: !!state.token,
    error: state.error
  });
  return state;
};
