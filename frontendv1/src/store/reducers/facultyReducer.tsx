import {
    ADD_TEST,
    ATTENDANCE_MARKED,
    FACULTY_LOGIN,
    GET_TEST,
    LOGOUT,
    MARKS_UPLOADED,
    UPDATE_FACULTY,
    UPDATE_PASSWORD,
} from "../Actions/actionTypes";

// Define the shape of the state
interface FacultyState {
    authData: any | null;
    updatedPassword: boolean;
    updatedFaculty: boolean;
    testAdded: boolean;
    marksUploaded: boolean;
    attendanceUploaded: boolean;
    tests: any[];
}

// Define the action type
interface Action {
    type: string;
    payload?: any;
    data?: any;
}

// Initial state
const initialState: FacultyState = {
    authData: null,
    updatedPassword: false,
    updatedFaculty: false,
    testAdded: false,
    marksUploaded: false,
    attendanceUploaded: false,
    tests: [],
};

// Faculty reducer
const facultyReducer = (state: FacultyState = initialState, action: Action): FacultyState => {
    switch (action.type) {
        case FACULTY_LOGIN:
            localStorage.setItem("user", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case UPDATE_PASSWORD:
            return {
                ...state,
                updatedPassword: action.payload,
            };
        case UPDATE_FACULTY:
            return {
                ...state,
                updatedFaculty: action.payload,
            };
        case ADD_TEST:
            return {
                ...state,
                testAdded: action.payload,
            };
        case GET_TEST:
            return {
                ...state,
                tests: action.payload,
            };
        case MARKS_UPLOADED:
            return {
                ...state,
                marksUploaded: action.payload,
            };
        case ATTENDANCE_MARKED:
            return {
                ...state,
                attendanceUploaded: action.payload,
            };
        default:
            return state;
    }
};

export default facultyReducer;
