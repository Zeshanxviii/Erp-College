import {create} from 'zustand';
import * as api from '../api/index';

interface StudentData {
    token?: string;
    passwordUpdated?: boolean;
    // Add other fields as needed
}

interface StoreState {
    errors: string | null;
    studentData: StudentData | null;
    subjects: any[]; // Define more specific type if possible
    attendance: any[]; // Define more specific type if possible
    testResults: any[]; // Define more specific type if possible

    setErrors: (error: string) => void;
    studentSignIn: (formData: any, navigate: (path: string) => void) => Promise<void>;
    studentUpdatePassword: (formData: any, navigate: (path: string) => void) => Promise<void>;
    updateStudent: (formData: any) => Promise<void>;
    getSubject: (department: string, year: string) => Promise<void>;
    getTestResult: (department: string, year: string, section: string) => Promise<void>;
    getAttendance: (department: string, year: string, section: string) => Promise<void>;
}

const useStudentStore = create<StoreState>((set) => ({
    errors: null,
    studentData: null,
    subjects: [],
    attendance: [],
    testResults: [],

    setErrors: (error) => set({ errors: error }),

    studentSignIn: async (formData, navigate) => {
        try {
            const { data } = await api.studentSignIn(formData);
            set({ studentData: data });
            if (data.result.passwordUpdated) navigate('/student/home');
            else navigate('/student/password');
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    studentUpdatePassword: async (formData, navigate) => {
        try {
            await api.studentUpdatePassword(formData);
            set((state) => ({
                studentData: { ...state.studentData, passwordUpdated: true },
            }));
            alert('Password Updated');
            navigate('/student/home');
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    updateStudent: async (formData) => {
        try {
            await api.updateStudent(formData);
            set((state) => ({
                studentData: { ...state.studentData, ...formData },
            }));
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    getSubject: async (department, year) => {
        try {
            const { data } = await api.getSubject({ department, year });
            set({ subjects: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    getTestResult: async (department, year, section) => {
        try {
            const { data } = await api.getTestResult({ department, year, section });
            set({ testResults: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    getAttendance: async (department, year, section) => {
        try {
            const { data } = await api.getAttendance({ department, year, section });
            set({ attendance: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },
}));

export default useStudentStore;
