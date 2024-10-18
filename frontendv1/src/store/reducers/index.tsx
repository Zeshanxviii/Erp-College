import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminReducer';
import facultyReducer from './facultyReducer';
import studentReducer from './studentReducer';

// Define the shape of the entire state
export interface RootState {
    admins: ReturnType<typeof adminReducer>
    faculty: ReturnType<typeof facultyReducer>
    student: ReturnType<typeof studentReducer>
}

// Create the store
export const store = configureStore({
    reducer: {
        admins: adminReducer,
        faculty: facultyReducer,
        student: studentReducer as any,
    },
});

// Optional: Define types for the app's dispatch and state
export type AppDispatch = typeof store.dispatch;