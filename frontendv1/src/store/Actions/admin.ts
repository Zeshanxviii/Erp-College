import { getAllDepartment, getAllFaculty, getAllAdmin } from './../api/index';
import { create } from 'zustand';
import * as api from '../api/index';
import {
    ADD_ADMIN,
    ADD_FACULTY,
    ADD_STUDENT,
    ADD_SUBJECT,
    ADMIN_LOGIN,
    GET_FACULTY,
    GET_SUBJECT,
    LOGOUT,
    UPDATE_ADMIN,
    GET_STUDENT,
    ADD_DEPARTMENT,
    GET_ALL_STUDENT,
    GET_ALL_SUBJECT,
    GET_ALL_FACULTY,
    GET_ALL_ADMIN,
    GET_ALL_DEPARTMENT,
    UPDATE_PASSWORD,
    GET_ADMIN,
    DELETE_ADMIN,
    DELETE_DEPARTMENT,
    DELETE_FACULTY,
    DELETE_STUDENT,
    DELETE_SUBJECT,
    CREATE_NOTICE,
    GET_NOTICE,
} from "./actionTypes";


interface AdminState {
    authData: any; // Replace `any` with a specific type if known
    updatedPassword: boolean;
    updatedAdmin: boolean;
    adminAdded: boolean;
    departmentAdded: boolean;
    facultyAdded: boolean;
    studentAdded: boolean;
    subjectAdded: boolean;
    allFaculty: any[]; // Specify item type if known
    allSubject: any[]; // Specify item type if known
    allStudent: any[]; // Specify item type if known
    allAdmin: any[]; // Specify item type if known
    allDepartment: any[]; // Specify item type if known
    student: any[]; // Specify item type if known
    faculties: any[]; // Specify item type if known
    subjects: any[]; // Specify item type if known
    admins: any[]; // Specify item type if known
    notices: any[]; // Specify item type if known
    adminDeleted: boolean;
    departmentDeleted: boolean;
    facultyDeleted: boolean;
    studentDeleted: boolean;
    subjectDeleted: boolean;
    noticeCreated: boolean;

    // Action methods
    login: (data: any) => void; // Replace `any` with a specific type
    logout: () => void;
    updatePassword: (payload: boolean) => void;
    updateAdmin: (payload: boolean) => void;
    addAdmin: (payload: boolean) => void;
    createNotice: (payload: boolean) => void;
    deleteAdmin: (payload: boolean) => void;
    deleteDepartment: (payload: boolean) => void;
    deleteFaculty: (payload: boolean) => void;
    deleteStudent: (payload: boolean) => void;
    deleteSubject: (payload: boolean) => void;
    addDepartment: (payload: boolean) => void;
    addFaculty: (payload: boolean) => void;
    setFaculties: (payload: any[]) => void; // Specify item type if known
    setNotices: (payload: any[]) => void; // Specify item type if known
    setAdmins: (payload: any[]) => void; // Specify item type if known
    setAllFaculty: (payload: any[]) => void; // Specify item type if known
    setAllAdmin: (payload: any[]) => void; // Specify item type if known
    setAllDepartment: (payload: any[]) => void; // Specify item type if known
    addSubject: (payload: boolean) => void;
    setSubjects: (payload: any[]) => void; // Specify item type if known
    setAllSubject: (payload: any[]) => void; // Specify item type if known
    addStudent: (payload: boolean) => void;
    setStudents: (payload: any[]) => void; // Specify item type if known
    setAllStudent: (payload: any[]) => void; // Specify item type if known
}

interface AdminData {
    token?: string;
    passwordUpdated?: boolean;
    // Add other relevant fields
}

interface Notice {
    id: string; // Unique identifier for the notice
    title: string; // Title of the notice
    description: string; // Detailed description
    date: string; // Date of the notice (can be a string or Date object)
    createdBy?: string; // Optional field for the creator's name or ID
    // Add other fields as necessary, e.g., status, category, etc.
}


interface ErrorState {
    message: string;
}

interface StoreState {
    adminData: AdminData | null;
    errors: ErrorState | null;
    passwordUpdated: boolean;
    students: any[]; // Define more specific types as necessary
    // Add more state properties as needed
    notice: Notice[]; // Array of notices
    setErrors: (error: ErrorState) => void;
    adminSignIn: (formData: any, navigate: (path: string) => void) => Promise<void>;
    adminUpdatePassword: (formData: any, navigate: (path: string) => void) => Promise<void>;
    getAllStudent: () => Promise<void>;
    getAllAdmin: () => Promise<void>;
    getAllFaculty: () => Promise<void>;
    getAllDepartment: () => Promise<void>;
    getNotice: (formData: any) => Promise<void>;
    // ... Add other action methods
}

const useAdminStore = create<StoreState & AdminState>((set) => ({
    adminData: null,
    errors: null,
    passwordUpdated: false,
    students: [], // Initialize as needed
    notice: [], // Initialize as an empty array
    authData: null,
    updatedPassword: false,
    updatedAdmin: false,
    adminAdded: false,
    departmentAdded: false,
    facultyAdded: false,
    studentAdded: false,
    subjectAdded: false,
    allFaculty: [],
    allSubject: [],
    allStudent: [],
    allAdmin: [],
    allDepartment: [],
    student: [],
    faculties: [],
    subjects: [],
    admins: [],
    notices: [],
    adminDeleted: false,
    departmentDeleted: false,
    facultyDeleted: false,
    studentDeleted: false,
    subjectDeleted: false,
    noticeCreated: false,
    setErrors: (error) => set({ errors: error }),

   adminSignIn: async (formData, navigate) => {
    try {
        const { data } = await api.adminSignIn(formData);
        set({ authData: data });
        navigate(data.result.passwordUpdated ? "/admin/home" : "/admin/update/password");
    } catch (error: any) {
        // Only update errors if they are not already set
        set((state) => {
            if (!state.errors || state.errors.message !== error.response?.data?.message) {
                return { errors: { message: error.response?.data?.message || 'An error occurred' } };
            }
            return state; // Return the existing state if no changes
        });
    }
},

    adminUpdatePassword: async (formData, navigate) => {
        try {
            await api.adminUpdatePassword(formData);
            set({ passwordUpdated: true });
            alert("Password Updated");
            navigate("/admin/home");
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    getAllStudent: async () => {
        try {
            const { data } = await api.getAllStudent();
            set({ students: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    getNotice: async (formData) => {
        try {
            const { data } = await api.getNotice(formData);
            set({ notices: data }); // Ensure you have a notice state if needed
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    getAllDepartment: async () => {
        try {
            const { data } = await api.getAllDepartment();
            set({ allDepartment: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },
    getAllFaculty: async () => {
        try {
            const { data } = await api.getAllFaculty();
            set({ allFaculty: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },
    getAllAdmin: async () => {
        try {
            const { data } = await api.getAllAdmin();
            set({ allAdmin: data });
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },
    // Action methods
    login: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        set({ authData: data });
    },
    logout: () => {
        localStorage.clear();
        set({ authData: null });
    },
    updatePassword: (payload) => set({ updatedPassword: payload }),
    updateAdmin: (payload) => set({ updatedAdmin: payload }),
    addAdmin: (payload) => set({ adminAdded: payload }),
    createNotice: (payload) => set({ noticeCreated: payload }),
    deleteAdmin: (payload) => set({ adminDeleted: payload }),
    deleteDepartment: (payload) => set({ departmentDeleted: payload }),
    deleteFaculty: (payload) => set({ facultyDeleted: payload }),
    deleteStudent: (payload) => set({ studentDeleted: payload }),
    deleteSubject: (payload) => set({ subjectDeleted: payload }),
    addDepartment: (payload) => set({ departmentAdded: payload }),
    addFaculty: (payload) => set({ facultyAdded: payload }),
    setFaculties: (payload) => set({ faculties: payload }),
    setNotices: (payload) => set({ notices: payload }),
    setAdmins: (payload) => set({ admins: payload }),
    setAllFaculty: (payload) => set({ allFaculty: payload }),
    setAllAdmin: (payload) => set({ allAdmin: payload }),
    setAllDepartment: (payload) => set({ allDepartment: payload }),
    addSubject: (payload) => set({ subjectAdded: payload }),
    setSubjects: (payload) => set({ subjects: payload }),
    setAllSubject: (payload) => set({ allSubject: payload }),
    addStudent: (payload) => set({ studentAdded: payload }),
    setStudents: (payload) => set({ students: payload }),
    setAllStudent: (payload) => set({ allStudent: payload }),

    // ... Implement other methods similarly
}));

export default useAdminStore;
