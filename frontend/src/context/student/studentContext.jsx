import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../api/index.js';

// Create context
const StudentContext = createContext();

// Action types
const SET_ERRORS = 'SET_ERRORS';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const TEST_RESULT = 'TEST_RESULT';
const STUDENT_LOGIN = 'STUDENT_LOGIN';
const ATTENDANCE = 'ATTENDANCE';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const GET_SUBJECT = 'GET_SUBJECT';

// Reducer
const studentReducer = (state, action) => {
    switch (action.type) {
        case STUDENT_LOGIN:
            return { ...state, studentData: action.payload };
        case SET_ERRORS:
            return { ...state, errors: action.payload };
        case UPDATE_PASSWORD:
        case UPDATE_STUDENT:
            return { ...state, [action.type.toLowerCase()]: action.payload };
        case TEST_RESULT:
        case ATTENDANCE:
        case GET_SUBJECT:
            return { ...state, [action.type.toLowerCase()]: action.payload };
        default:
            return state;
    }
};

// Provider component
export const StudentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(studentReducer, {
        studentData: null,
        errors: null,
        passwordUpdated: false,
        testResult: null,
        attendance: null,
        subjects: null,
    });

    const studentSignIn = async (formData, navigate) => {
        try {
            const { data } = await api.studentSignIn(formData);
            dispatch({ type: STUDENT_LOGIN, payload: data });
            if (data.result.passwordUpdated) navigate("/student/home");
            else navigate("/student/password");
        } catch (error) {
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        }
    };

    const studentUpdatePassword = async (formData, navigate) => {
        try {
            const { data } = await api.studentUpdatePassword(formData);
            dispatch({ type: UPDATE_PASSWORD, payload: true });
            alert("Password Updated");
            navigate("/student/home");
        } catch (error) {
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        }
    };

    const updateStudent = async (formData) => {
        try {
            const { data } = await api.updateStudent(formData);
            dispatch({ type: UPDATE_STUDENT, payload: true });
        } catch (error) {
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        }
    };

    const getSubject = async (department, year) => {
        try {
            const formData = { department, year };
            const { data } = await api.getSubject(formData);
            dispatch({ type: GET_SUBJECT, payload: data });
        } catch (error) {
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        }
    };

    const getTestResult = async (department, year, section) => {
        try {
            const formData = { department, year, section };
            const { data } = await api.getTestResult(formData);
            dispatch({ type: TEST_RESULT, payload: data });
        } catch (error) {
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        }
    };

    const getAttendance = async (department, year, section) => {
        try {
            const formData = { department, year, section };
            const { data } = await api.getAttendance(formData);
            dispatch({ type: ATTENDANCE, payload: data });
        } catch (error) {
            dispatch({ type: SET_ERRORS, payload: error.response.data });
        }
    };

    return (
        <StudentContext.Provider value={{
            state,
            studentSignIn,
            studentUpdatePassword,
            updateStudent,
            getSubject,
            getTestResult,
            getAttendance,
        }}>
            {children}
        </StudentContext.Provider>
    );
};

// Custom hook to use the student context
export const useStudent = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudent must be used within a StudentProvider');
    }
    return context;
};