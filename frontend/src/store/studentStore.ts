import { create } from 'zustand';

interface StudentState {
  authData: any | null;
  profile: any | null;
  attendance: any[];
  subjects: any[];
  testResults: any[];
  loading: boolean;
  error: string | null;
}

interface StudentActions {
  login: (data: any) => void;
  logout: () => void;
  setProfile: (profile: any) => void;
  updateProfile: (updates: any) => void;
  fetchAttendance: () => Promise<void>;
  fetchSubjects: () => Promise<void>;
  fetchTestResults: () => Promise<void>;
  reset: () => void;
}

const useStudentStore = create<StudentState & StudentActions>((set) => ({
  // State
  authData: null,
  profile: null,
  attendance: [],
  subjects: [],
  testResults: [],
  loading: false,
  error: null,

  // Actions
  login: (data) => {
    localStorage.setItem('student', JSON.stringify(data));
    set({ authData: data });
  },
  
  logout: () => {
    localStorage.removeItem('student');
    set({ authData: null, profile: null });
  },
  
  setProfile: (profile) => set({ profile }),
  
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  })),
  
  fetchAttendance: async () => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      const attendanceData: any[] = []; // Mock data
      set({ attendance: attendanceData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch attendance', loading: false });
    }
  },
  
  fetchSubjects: async () => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      const subjectsData: any[] = []; // Mock data
      set({ subjects: subjectsData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch subjects', loading: false });
    }
  },
  
  fetchTestResults: async () => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      const testResultsData: any[] = []; // Mock data
      set({ testResults: testResultsData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch test results', loading: false });
    }
  },
  
  reset: () => set({
    authData: null,
    profile: null,
    attendance: [],
    subjects: [],
    testResults: [],
    error: null
  })
}));

export default useStudentStore;
