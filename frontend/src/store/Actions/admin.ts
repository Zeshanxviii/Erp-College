import { create } from 'zustand';
import * as api from '../api/index';

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
    getNotice: (formData: any) => Promise<void>;
    // ... Add other action methods
}

const useAdminStore = create<StoreState>((set) => ({
    adminData: null,
    errors: null,
    passwordUpdated: false,
    students: [], // Initialize as needed
    notice: [], // Initialize as an empty array

    setErrors: (error) => set({ errors: error }),

    adminSignIn: async (formData, navigate) => {
        try {
            const { data } = await api.adminSignIn(formData);
            set({ adminData: data });
            if (data.result.passwordUpdated) navigate("/admin/home");
            else navigate("/admin/update/password");
        } catch (error: any) {
            set({ errors: error.response.data });
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
            set({ notice: data }); // Ensure you have a notice state if needed
        } catch (error: any) {
            set({ errors: error.response.data });
        }
    },

    // ... Implement other methods similarly
}));

export default useAdminStore;
