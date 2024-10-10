import { create } from 'zustand';

interface ErrorState {
    errors: Record<string, any> | null; // Adjust type as necessary
    setErrors: (error: Record<string, any>) => void;
    clearErrors: () => void;
}

const useErrorStore = create<ErrorState>((set) => ({
    errors: null,
    setErrors: (error) => set({ errors: error }),
    clearErrors: () => set({ errors: null }),
}));

export default useErrorStore;
