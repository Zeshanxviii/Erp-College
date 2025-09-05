import { create } from 'zustand';

interface FacultyState {
  profile: any | null;
  courses: any[];
  attendanceRecords: any[];
  testResults: any[];
  loading: boolean;
  error: string | null;
}

interface FacultyActions {
  setProfile: (profile: any) => void;
  updateProfile: (updates: any) => void;
  fetchCourses: () => Promise<void>;
  createAttendance: (data: any) => Promise<void>;
  updateTestResults: (studentId: string, testId: string, marks: number) => Promise<void>;
  reset: () => void;
}

const useFacultyStore = create<FacultyState & FacultyActions>((set) => ({
  // State
  profile: null,
  courses: [],
  attendanceRecords: [],
  testResults: [],
  loading: false,
  error: null,

  // Actions
  setProfile: (profile) => set({ profile }),
  
  updateProfile: (updates) => set((state) => ({
    profile: { ...state.profile, ...updates }
  })),
  
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      const coursesData: any[] = []; // Mock data
      set({ courses: coursesData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch courses', loading: false });
    }
  },
  
  createAttendance: async (data) => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      set((state) => ({ 
        attendanceRecords: [...state.attendanceRecords, data],
        loading: false 
      }));
    } catch (error) {
      set({ error: 'Failed to create attendance', loading: false });
    }
  },
  
  updateTestResults: async (studentId, testId, marks) => {
    set({ loading: true, error: null });
    try {
      // API call would go here
      set((state) => {
        const updatedResults = state.testResults.map(result => 
          result.studentId === studentId && result.testId === testId 
            ? { ...result, marks } 
            : result
        );
        return { testResults: updatedResults, loading: false };
      });
    } catch (error) {
      set({ error: 'Failed to update test results', loading: false });
    }
  },
  
  reset: () => set({
    profile: null,
    courses: [],
    attendanceRecords: [],
    testResults: [],
    error: null
  })
}));

export default useFacultyStore;
