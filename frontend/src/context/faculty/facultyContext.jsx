import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../api/index.js';

// Create context
const FacultyContext = createContext();

// Action types
const SET_ERRORS = 'SET_ERRORS';
const FACULTY_LOGIN = 'FACULTY_LOGIN';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const UPDATE_FACULTY = 'UPDATE_FACULTY';
const ADD_TEST = 'ADD_TEST';
const GET_TEST = 'GET_TEST';
const GET_STUDENT = 'GET_STUDENT';
const MARKS_UPLOADED = 'MARKS_UPLOADED';
const ATTENDANCE_MARKED = 'ATTENDANCE_MARKED';

// Reducer
const facultyReducer = (state, action) => {
  switch (action.type) {
    case FACULTY_LOGIN:
      return { ...state, facultyData: action.payload };
    case SET_ERRORS:
      return { ...state, errors: action.payload };
    case UPDATE_PASSWORD:
    case UPDATE_FACULTY:
    case ADD_TEST:
    case MARKS_UPLOADED:
    case ATTENDANCE_MARKED:
      return { ...state, [action.type.toLowerCase()]: action.payload };
    case GET_TEST:
    case GET_STUDENT:
      return { ...state, [action.type.toLowerCase()]: action.payload };
    default:
      return state;
  }
};

// Provider component
export const FacultyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(facultyReducer, {
    facultyData: null,
    errors: null,
    passwordUpdated: false,
    testAdded: false,
    marksUploaded: false,
    attendanceMarked: false,
  });

  const facultySignIn = async (formData, navigate) => {
    try {
      const { data } = await api.facultySignIn(formData);
      dispatch({ type: FACULTY_LOGIN, payload: data });
      if (data.result.passwordUpdated) navigate("/faculty/home");
      else navigate("/faculty/password");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const facultyUpdatePassword = async (formData, navigate) => {
    try {
      const { data } = await api.facultyUpdatePassword(formData);
      dispatch({ type: UPDATE_PASSWORD, payload: true });
      alert("Password Updated");
      navigate("/faculty/home");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const updateFaculty = async (formData) => {
    try {
      const { data } = await api.updateFaculty(formData);
      dispatch({ type: UPDATE_FACULTY, payload: true });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const createTest = async (formData) => {
    try {
      const { data } = await api.createTest(formData);
      alert("Test Created Successfully");
      dispatch({ type: ADD_TEST, payload: true });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const getTest = async (formData) => {
    try {
      const { data } = await api.getTest(formData);
      dispatch({ type: GET_TEST, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const getStudent = async (formData) => {
    try {
      const { data } = await api.getMarksStudent(formData);
      dispatch({ type: GET_STUDENT, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const uploadMark = async (marks, department, section, year, test) => {
    try {
      const formData = {
        marks,
        department,
        section,
        year,
        test,
      };
      const { data } = await api.uploadMarks(formData);
      alert("Marks Uploaded Successfully");
      dispatch({ type: MARKS_UPLOADED, payload: true });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const markAttendance = async (checkedValue, subjectName, department, year, section) => {
    try {
      const formData = {
        selectedStudents: checkedValue,
        subjectName,
        department,
        year,
        section,
      };
      const { data } = await api.markAttendance(formData);
      alert("Attendance Marked Successfully");
      dispatch({ type: ATTENDANCE_MARKED, payload: true });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  return (
    <FacultyContext.Provider value={{
      state,
      facultySignIn,
      facultyUpdatePassword,
      updateFaculty,
      createTest,
      getTest,
      getStudent,
      uploadMark,
      markAttendance,
    }}>
      {children}
    </FacultyContext.Provider>
  );
};

// Custom hook to use the faculty context
export const useFaculty = () => {
  const context = useContext(FacultyContext);
  if (!context) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
};