import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as api from '../api';

interface FormData {
    // Define your form data structure here
    [key: string]: any;
}

interface FacultyState {
    errors: string | null;
    isPasswordUpdated: boolean;
    authData: any;
    // Add other state properties as needed
}

const initialState: FacultyState = {
    errors: null,
    isPasswordUpdated: false,
    authData: null,
    // Initialize other state properties
};

// Async actions using createAsyncThunk
export const facultySignIn = createAsyncThunk(
    'faculty/signIn',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            const { data } = await api.facultySignIn(formData);
            return data; // This will be the fulfilled action payload
        } catch (error: any) {
            return rejectWithValue(error.response.data); // This will be the rejected action payload
        }
    }
);

export const facultyUpdatePassword = createAsyncThunk(
    'faculty/updatePassword',
    async (formData: FormData, { rejectWithValue }) => {
        try {
            await api.facultyUpdatePassword(formData);
            return true; // Indicates success
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Define your slice
const facultySlice = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        setErrors(state, action: PayloadAction<string | null>) {
            state.errors = action.payload;
        },
        // Additional synchronous reducers can go here
    },
    extraReducers: (builder) => {
        builder
            .addCase(facultySignIn.fulfilled, (state, action: PayloadAction<any>) => {
                // Handle successful login
                state.authData = action.payload;
                if (action.payload.result.passwordUpdated) {
                    // Navigate to home or handle accordingly
                } else {
                    // Navigate to password update page
                }
            })
            .addCase(facultySignIn.rejected, (state, action) => {
                state.errors = action.payload as string; // Set error message
            })
            .addCase(facultyUpdatePassword.fulfilled, (state) => {
                state.isPasswordUpdated = true;
            })
            .addCase(facultyUpdatePassword.rejected, (state, action) => {
                state.errors = action.payload as string;
            });
    },
});

// Export actions and reducer
export const { setErrors } = facultySlice.actions;
export default facultySlice.reducer;
