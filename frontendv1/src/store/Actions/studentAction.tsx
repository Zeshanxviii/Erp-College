import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../api';

interface FormData {
    [key: string]: any; // Define your form data structure
}

interface StudentState {
    errors: string | null;
    isPasswordUpdated: boolean;
    subjects: any[]; // Adjust based on your actual data structure
    testResults: any[]; // Adjust based on your actual data structure
    attendance: any[]; // Adjust based on your actual data structure
    authData: any;
}

const initialState: StudentState = {
    errors: null,
    isPasswordUpdated: false,
    subjects: [],
    testResults: [],
    attendance: [],
    authData: null,
};

// Async actions using createAsyncThunk
export const studentSignIn = createAsyncThunk(
    'student/signIn',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const { data } = await api.studentSignIn(formData);
            return data; // This will be the fulfilled action payload
        } catch (error: any) {
            return rejectWithValue(error.response.data); // This will be the rejected action payload
        }
    }
);

export const studentUpdatePassword = createAsyncThunk(
    'student/updatePassword',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            await api.studentUpdatePassword(formData);
            return true; // Indicates success
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateStudent = createAsyncThunk(
    'student/update',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            await api.updateStudent(formData);
            return true; // Indicates success
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getSubject = createAsyncThunk(
    'student/getSubject',
    async ({ department, year }: { department: string; year: string }, { rejectWithValue }) => {
        try {
            const formData = { department, year };
            const { data } = await api.getSubject(formData);
            return data; // Return subject data
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getTestResult = createAsyncThunk(
    'student/getTestResult',
    async ({ department, year, section }: { department: string; year: string; section: string }, { rejectWithValue }) => {
        try {
            const formData = { department, year, section };
            const { data } = await api.getTestResult(formData);
            return data; // Return test result data
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAttendance = createAsyncThunk(
    'student/getAttendance',
    async ({ department, year, section }: { department: string; year: string; section: string }, { rejectWithValue }) => {
        try {
            const formData = { department, year, section };
            const { data } = await api.getAttendance(formData);
            return data; // Return attendance data
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Define your slice
const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setErrors(state, action: PayloadAction<string | null>) {
            state.errors = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(studentSignIn.fulfilled, (state, action: PayloadAction<any>) => {
                // Handle successful sign in
                state.authData = action.payload;
                if (action.payload.result.passwordUpdated) {
                    // Handle navigation or state update
                } else {
                    // Handle password update required
                }
            })
            .addCase(studentSignIn.rejected, (state, action) => {
                state.errors = action.payload as string; // Set error message
            })
            .addCase(studentUpdatePassword.fulfilled, (state) => {
                state.isPasswordUpdated = true;
            })
            .addCase(studentUpdatePassword.rejected, (state, action) => {
                state.errors = action.payload as string;
            })
            .addCase(getSubject.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.subjects = action.payload; // Set subjects
            })
            .addCase(getSubject.rejected, (state, action) => {
                state.errors = action.payload as string;
            })
            .addCase(getTestResult.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.testResults = action.payload; // Set test results
            })
            .addCase(getTestResult.rejected, (state, action) => {
                state.errors = action.payload as string;
            })
            .addCase(getAttendance.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.attendance = action.payload; // Set attendance
            })
            .addCase(getAttendance.rejected, (state, action) => {
                state.errors = action.payload as string;
            });
    },
});

// Export actions and reducer
export const { setErrors } = studentSlice.actions;
export default studentSlice.reducer;
