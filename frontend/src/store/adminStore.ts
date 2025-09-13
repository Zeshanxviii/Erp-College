import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Department, Faculty, Student, Subject } from '@/types';
import apiService from '@/api';

export interface AdminState {
  // Profile and data
  profile: any | null;
  departments: Department[];
  faculties: Faculty[];
  students: Student[];
  subjects: Subject[];
  
  // UI state
  loading: boolean;
  error: string | null;
  
  // Actions
  setProfile: (profile: any) => void;
  updateProfile: (updates: any) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  
  // Data management actions
  createDepartment: (data: any) => Promise<void>;
  createFaculty: (data: any) => Promise<void>;
  fetchFaculties: () => Promise<void>;
  createStudent: (data: any) => Promise<void>;
  fetchStudents: () => Promise<void>;
  createSubject: (data: any) => Promise<void>;
  fetchSubjects: () => Promise<void>;
  
  // Reset state
  reset: () => void;
}

const useAdminStore = create<AdminState>()(
  persist(
    //@ts-ignore
    (set, get) => ({
      // Initial state
      profile: null,
      departments: [],
      faculties: [],
      students: [],
      subjects: [],
      loading: false,
      error: null,

      // Profile management
      setProfile: (profile: any) => set({ profile }),
      
      updateProfile: (updates: any) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...updates } : null
      })),

      // Error and loading management
      clearError: () => set({ error: null }),
      setLoading: (loading: boolean) => set({ loading }),

      // Data management actions with proper error handling
      createDepartment: async (data: any) => {
        set({ loading: true, error: null });
        try {
          // API call would go here
          // const response = await apiService.admin.createDepartment(data);
          set((state) => ({ 
            departments: [...state.departments, data],
            loading: false 
          }));
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to create department', 
            loading: false 
          });
          throw error;
        }
      },

      createFaculty: async (data: any) => {
        set({ loading: true, error: null });
        try {
          // API call would go here
          // const response = await apiService.admin.createFaculty(data);
          set((state) => ({ 
            faculties: [...state.faculties, data],
            loading: false 
          }));
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to create faculty', 
            loading: false 
          });
          throw error;
        }
      },

      fetchFaculties: async () => {
        set({ loading: true, error: null });
        try {
          // Make actual API call to fetch faculties
          const response = await apiService.admin.getFaculty();
          
          // Check if response data is valid
          if (!response.data || !Array.isArray(response.data)) {
            throw new Error('Invalid faculty data received from API');
          }
          
          // Map API data to Faculty type
          const mappedFaculties: Faculty[] = response.data.map((faculty: any) => ({
            id: faculty.id || faculty._id || '',
            name: faculty.name || '',
            firstName: faculty.firstName || (faculty.name ? faculty.name.split(' ')[0] : ''),
            lastName: faculty.lastName || (faculty.name ? faculty.name.split(' ').slice(1).join(' ') : ''),
            position: faculty.position || '',
            qualification: faculty.qualification || '',
            departmentId: faculty.departmentId || (faculty.department ? faculty.department._id : '') || '',
            departmentName: faculty.departmentName || (faculty.department ? faculty.department.name : '') || '',
            email: faculty.email || '',
            phone: faculty.phone || '',
            joiningDate: faculty.joiningDate || faculty.createdAt || '',
            status: faculty.status || 'active',
            experience: faculty.experience || 0,
            hireDate: faculty.hireDate || faculty.joiningDate || faculty.createdAt || '',
          }));
          
          // Update state with fetched faculties
          set({ 
            faculties: mappedFaculties, 
            loading: false,
            error: null
          });
        } catch (error: any) {
          console.error('Error fetching faculties:', error);
          set({ 
            error: error.message || 'Failed to fetch faculty data',
            loading: false 
          });
        }
      },
      

      createStudent: async (data: any) => {
        set({ loading: true, error: null });
        try {
          // API call would go here
          // const response = await apiService.admin.createStudent(data);
          set((state) => ({ 
            students: [...state.students, data],
            loading: false 
          }));
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to create student', 
            loading: false 
          });
          throw error;
        }
      },

      createSubject: async (data: any) => {
        set({ loading: true, error: null });
        try {
          // API call would go here
          // const response = await apiService.admin.createSubject(data);
          set((state) => ({ 
            subjects: [...state.subjects, data],
            loading: false 
          }));
        } catch (error: any) {
          set({ 
            error: error.message || 'Failed to create subject', 
            loading: false 
          });
          throw error;
        }
      },
      fetchSubjects: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiService.admin.getSubjects(); // Replace with your actual API call
          const apiSubjects = (res.data as any[]) || [];
      
          const mapped: Subject[] = apiSubjects.map((s: any) => ({
            id: s.id ?? s._id ?? '',
            name: s.name ?? '',
            code: s.code ?? '',
            credits: s.credits ?? 0,
            departmentId: s.departmentId ?? s.department?._id ?? '',
            departmentName: s.departmentName ?? s.department?.name ?? '',
            semester: s.semester ?? '',
            description: s.description ?? '',
            courseId: s.courseId ?? s.course?._id ?? '',
            courseName: s.courseName ?? s.course?.name ?? '',
          }));
      
          set({ subjects: mapped, loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch subjects', loading: false });
          throw error;
        }
      },
      

      fetchStudents: async () => {
        set({ loading: true, error: null });
        try {
          const res = await apiService.admin.getStudents();
          const apiStudents = (res.data as any[]) || [];
          const mapped: Student[] = apiStudents.map((s: any) => ({
            id: s.id ?? s._id ?? '',
            firstName: s.firstName ?? (typeof s.name === 'string' ? (s.name.split(' ')[0] ?? '') : ''),
            lastName: s.lastName ?? (typeof s.name === 'string' ? (s.name.split(' ').slice(1).join(' ') ?? '') : ''),
            email: s.email ?? '',
            phone: s.phone ?? '',
            departmentId: s.departmentId ?? s.department?._id ?? '',
            departmentName: s.departmentName ?? s.department?.name ?? s.department ?? '',
            enrollmentDate: s.enrollmentDate ?? s.createdAt ?? '',
            graduationYear: s.graduationYear ?? s.year ?? 0,
            status: s.status ?? 'enrolled',
          }));
          set({ students: mapped, loading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to fetch students', loading: false });
          throw error;
        }
      },

      // Reset all state
      reset: () => set({
        profile: null,
        departments: [],
        faculties: [],
        students: [],
        subjects: [],
        loading: false,
        error: null
      })
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist data, not authentication
      partialize: (state) => ({
        profile: state.profile,
        departments: state.departments,
        faculties: state.faculties,
        students: state.students,
        subjects: state.subjects,
      }),
    }
  )
);

// Selector hooks for better performance
export const useAdminProfile = () => useAdminStore((state) => state.profile);
export const useAdminLoading = () => useAdminStore((state) => state.loading);
export const useAdminError = () => useAdminStore((state) => state.error);

// Data selector hooks
export const useAdminDepartments = () => useAdminStore((state) => state.departments);
export const useAdminFaculties = () => useAdminStore((state) => state.faculties);
export const useAdminStudents = () => useAdminStore((state) => state.students);
export const useAdminSubjects = () => useAdminStore((state) => state.subjects);

// Action hooks
export const useAdminSetProfile = () => useAdminStore((state) => state.setProfile);
export const useAdminUpdateProfile = () => useAdminStore((state) => state.updateProfile);
export const useAdminClearError = () => useAdminStore((state) => state.clearError);
export const useAdminSetLoading = () => useAdminStore((state) => state.setLoading);

// Data management hooks
export const useAdminCreateDepartment = () => useAdminStore((state) => state.createDepartment);
export const useAdminCreateFaculty = () => useAdminStore((state) => state.createFaculty);
export const useAdminCreateStudent = () => useAdminStore((state) => state.createStudent);
export const useAdminCreateSubject = () => useAdminStore((state) => state.createSubject);
export const useAdminFetchStudents = () => useAdminStore((state) => state.fetchStudents);
export const useAdminFetchFaculties = () => useAdminStore((state) => state.fetchFaculties);
export const useAdminFetchSubjects = () => useAdminStore((state) => state.fetchSubjects);


// Debug function
export const debugAdminStore = () => {
  const state = useAdminStore.getState();
  console.log('AdminStore Debug Info:', {
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    dataCounts: {
      departments: state.departments.length,
      faculties: state.faculties.length,
      students: state.students.length,
      subjects: state.subjects.length,
    }
  });
  return state;
};

export default useAdminStore;
