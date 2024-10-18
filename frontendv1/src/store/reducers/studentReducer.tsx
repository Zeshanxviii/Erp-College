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
    authData: any | null;  // Replace 'any' with the actual type if known
    updatedPassword: boolean;
    updatedFaculty: boolean;
    testAdded: boolean;
    marksUploaded: boolean;
    attendanceUploaded: boolean;
    tests: any[];  // You can define a specific type for tests if known
}

// Define the action type
interface FacultyAction {
    type:
    | typeof FACULTY_LOGIN
    | typeof LOGOUT
    | typeof UPDATE_PASSWORD
    | typeof UPDATE_FACULTY
    | typeof ADD_TEST
    | typeof GET_TEST
    | typeof MARKS_UPLOADED
    | typeof ATTENDANCE_MARKED;
    payload?: any;  // Specify payload types if possible
    data?: any;  // Specify data types if possible
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
const facultyReducer = (state: FacultyState = initialState, action: FacultyAction): FacultyState => {
    switch (action.type) {
        case FACULTY_LOGIN:
            localStorage.setItem("user", JSON.stringify({ ...action.data }));
            return { ...state, authData: action.data };
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
