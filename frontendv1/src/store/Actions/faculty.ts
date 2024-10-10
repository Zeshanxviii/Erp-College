import {create} from 'zustand';
import * as api from '../api/index';

interface FacultyData {
    token?: string;
    passwordUpdated?: boolean;
    // Add other fields as necessary
}

interface ErrorState {
    message: string;
}

interface StoreState {
    errors: ErrorState | null;
    facultyData: FacultyData | null;
    tests: any[]; // Define more specific types as needed
    students: any[]; // Define more specific types as needed
    attendanceMarked: boolean;

    setErrors: (error: ErrorState) => void;
    facultySignIn: (formData: any, navigate: (path: string) => void) => Promise<void>;
    facultyUpdatePassword: (formData: any, navigate: (path: string) => void) => Promise<void>;
    updateFaculty: (formData: any) => Promise<void>;
    createTest: (formData: any) => Promise<void>;
    getTest: (formData: any) => Promise<void>;
    getStudent: (formData: any) => Promise<void>;
    uploadMark: (marks: any, department: string, section: string, year: string, test: any) => Promise<void>;
    markAttendance: (checkedValue: any, subjectName: string, department: string, year: string, section: string) => Promise<void>;
}

const useFacultyStore = create<StoreState>((set) => ({
    errors: null,
    facultyData: null,
    tests: [],
    students: [],
    attendanceMarked: false,

    setErrors: (error) => set({ errors: error }),

    facultySignIn: async (formData, navigate) => {
        try {
            const { data } = await api.facultySignIn(formData);
            set({ facultyData: data });
            if (data.result.passwordUpdated) navigate('/faculty/home');
            else navigate('/faculty/password');
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    facultyUpdatePassword: async (formData, navigate) => {
        try {
            await api.facultyUpdatePassword(formData);
            set((state) => ({
                facultyData: { ...state.facultyData, passwordUpdated: true },
            }));
            alert('Password Updated');
            navigate('/faculty/home');
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    updateFaculty: async (formData) => {
        try {
            await api.updateFaculty(formData);
            alert('Faculty Updated Successfully');
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    createTest: async (formData) => {
        try {
            await api.createTest(formData);
            alert('Test Created Successfully');
            set((state) => ({ tests: [...state.tests, formData] })); // Update tests if needed
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    getTest: async (formData) => {
        try {
            const { data } = await api.getTest(formData);
            set({ tests: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    getStudent: async (formData) => {
        try {
            const { data } = await api.getMarksStudent(formData);
            set({ students: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    uploadMark: async (marks, department, section, year, test) => {
        try {
            const formData = { marks, department, section, year, test };
            await api.uploadMarks(formData);
            alert('Marks Uploaded Successfully');
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    markAttendance: async (checkedValue, subjectName, department, year, section) => {
        try {
            const formData = { selectedStudents: checkedValue, subjectName, department, year, section };
            await api.markAttendance(formData);
            alert('Attendance Marked Successfully');
            set({ attendanceMarked: true });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },
}));

export default useFacultyStore;
