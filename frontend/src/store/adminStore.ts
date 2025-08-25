import { create } from 'zustand';

interface AdminState {
  authData: any | null;
  profile: any | null;
  departments: any[];
  faculties: any[];
  students: any[];
  subjects: any[];
  loading: boolean;
  error: string | null;
  updatedPassword: boolean;
}

interface AdminActions {
  login: (data: any) => void;
  logout: () => void;
  setProfile: (profile: any) => void;
  updateProfile: (updates: any) => void;
  createDepartment: (data: any) => Promise<void>;
  createFaculty: (data: any) => Promise<void>;
  createStudent: (data: any) => Promise<void>;
  createSubject: (data: any) => Promise<void>;
  reset: () => void;
}

const useAdminStore = create<AdminState & AdminActions>((set) => ({
  // State
  authData: null,
  profile: null,
  departments: [],
  faculties: [],
  students: [],
  subjects: [],
  loading: false,
  error: null,
  updatedPassword: false,

  // Actions
  login: (data) => {
    localStorage.setItem('admin', JSON.stringify(data));
    set({ authData: data });
  },
  
  logout: () => {
    localStorage.removeItem('admin');
    set({ authData: null, profile: null });
  },
  
  setProfile: (profile) => set({ profile }),
  
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  })),
  
  createDepartment: async (data) => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      set((state) => ({ 
        departments: [...state.departments, data],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create department', loading: false });
    }
  },
  
  createFaculty: async (data) => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      set((state) => ({ 
        faculties: [...state.faculties, data],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create faculty', loading: false });
    }
  },
  
  createStudent: async (data) => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      set((state) => ({ 
        students: [...state.students, data],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create student', loading: false });
    }
  },
  
  createSubject: async (data) => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      set((state) => ({ 
        subjects: [...state.subjects, data],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create subject', loading: false });
    }
  },
  
  reset: () => set({
    authData: null,
    profile: null,
    departments: [],
    faculties: [],
    students: [],
    subjects: [],
    error: null
  })
}));

export default useAdminStore;
