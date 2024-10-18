import {
    LOGOUT,
    STUDENT_LOGIN,
    UPDATE_STUDENT,
    UPDATE_PASSWORD,
    TEST_RESULT,
    ATTENDANCE,
} from "../Actions/actionTypes";

// Define the shape of the state
interface StudentState {
    authData: any | null; // Replace 'any' with a specific type if known
    updatedPassword: boolean;
    updatedStudent: boolean;
    testAdded: boolean;
    marksUploaded: boolean;
    attendanceUploaded: boolean;
    testResult: any[]; // Define a specific type if known
    tests: any[]; // Define a specific type if known
    attendance: any[]; // Define a specific type if known
}

// Define the action type
interface StudentAction {
    type:
    | typeof STUDENT_LOGIN
    | typeof LOGOUT
    | typeof UPDATE_PASSWORD
    | typeof UPDATE_STUDENT
    | typeof TEST_RESULT
    | typeof ATTENDANCE;
    payload?: any; // Specify payload types if possible
    data?: any; // Specify data types if possible
}

// Initial state
const initialState: StudentState = {
    authData: null,
    updatedPassword: false,
    updatedStudent: false,
    testAdded: false,
    marksUploaded: false,
    attendanceUploaded: false,
    testResult: [],
    tests: [],
    attendance: [],
};

// Student reducer
const studentReducer = (state: StudentState = initialState, action: StudentAction): StudentState => {
    switch (action.type) {
        case STUDENT_LOGIN:
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
        case UPDATE_STUDENT:
            return {
                ...state,
                updatedStudent: action.payload,
            };
        case TEST_RESULT:
            return {
                ...state,
                testResult: action.payload,
            };
        case ATTENDANCE:
            return {
                ...state,
                attendance: action.payload,
            };
        default:
            return state;
    }
};

export default studentReducer;
