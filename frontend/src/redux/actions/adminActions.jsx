import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../api';

// Create context
const AdminContext = createContext();

// Action types
const ADMIN_LOGIN = 'ADMIN_LOGIN';
const UPDATE_ADMIN = 'UPDATE_ADMIN';
const ADD_ADMIN = 'ADD_ADMIN';
const ADD_DEPARTMENT = 'ADD_DEPARTMENT';
const ADD_FACULTY = 'ADD_FACULTY';
const GET_ALL_FACULTY = 'GET_ALL_FACULTY';
const ADD_SUBJECT = 'ADD_SUBJECT';
const ADD_STUDENT = 'ADD_STUDENT';
const GET_ALL_STUDENT = 'GET_ALL_STUDENT';
const GET_FACULTY = 'GET_FACULTY';
const GET_SUBJECT = 'GET_SUBJECT';
const GET_STUDENT = 'GET_STUDENT';
const GET_ALL_ADMIN = 'GET_ALL_ADMIN';
const GET_ALL_DEPARTMENT = 'GET_ALL_DEPARTMENT';
const SET_ERRORS = 'SET_ERRORS';
const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
const GET_ALL_SUBJECT = 'GET_ALL_SUBJECT';
const DELETE_ADMIN = 'DELETE_ADMIN';
const DELETE_DEPARTMENT = 'DELETE_DEPARTMENT';
const DELETE_FACULTY = 'DELETE_FACULTY';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_SUBJECT = 'DELETE_SUBJECT';
const CREATE_NOTICE = 'CREATE_NOTICE';
const GET_NOTICE = 'GET_NOTICE';

// Reducer
const adminReducer = (state, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { ...state, adminData: action.payload };
    case UPDATE_ADMIN:
    case ADD_ADMIN:
    case ADD_DEPARTMENT:
    case ADD_FACULTY:
    case ADD_SUBJECT:
    case ADD_STUDENT:
    case DELETE_ADMIN:
    case DELETE_DEPARTMENT:
    case DELETE_FACULTY:
    case DELETE_STUDENT:
    case DELETE_SUBJECT:
    case CREATE_NOTICE:
      return { ...state, [action.type.toLowerCase()]: action.payload };
    case GET_ALL_FACULTY:
    case GET_ALL_STUDENT:
    case GET_ALL_ADMIN:
    case GET_ALL_DEPARTMENT:
    case GET_ALL_SUBJECT:
    case GET_FACULTY:
    case GET_SUBJECT:
    case GET_STUDENT:
    case GET_NOTICE:
      return { ...state, [action.type.toLowerCase()]: action.payload };
    case SET_ERRORS:
      return { ...state, errors: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, passwordUpdated: action.payload };
    default:
      return state;
  }
};

// Provider component
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    adminData: null,
    errors: null,
    passwordUpdated: false,
  });

  const adminSignIn = async (formData, navigate) => {
    try {
      const { data } = await api.adminSignIn(formData);
      dispatch({ type: ADMIN_LOGIN, payload: data });
      if (data.result.passwordUpdated) navigate("/admin/home");
      else navigate("/admin/update/password");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const adminUpdatePassword = async (formData, navigate) => {
    try {
      await api.adminUpdatePassword(formData);
      dispatch({ type: UPDATE_PASSWORD, payload: true });
      alert("Password Updated");
      navigate("/admin/home");
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  const getAllStudent = async () => {
    try {
      const { data } = await api.getAllStudent();
      dispatch({ type: GET_ALL_STUDENT, payload: data });
    } catch (error) {
      console.log("Context Error", error);
    }
  };

  // ... Similarly implement other functions ...

  const getNotice = async (formData) => {
    try {
      const { data } = await api.getNotice(formData);
      dispatch({ type: GET_NOTICE, payload: data });
    } catch (error) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    }
  };

  return (
    <AdminContext.Provider value={{
      state,
      adminSignIn,
      adminUpdatePassword,
      getAllStudent,
      // ... Include all other functions here ...
      getNotice,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};