import { SET_ERRORS } from "../Actions/actionTypes";

// Define the shape of the state
interface ErrorState {
    [key: string]: any; // Adjust this type based on your actual error structure
}

// Define the action type
interface ErrorAction {
    type: typeof SET_ERRORS;
    payload: ErrorState; // Adjust type based on the structure of errors
}

// Initial state
const initialState: ErrorState = {};

// Error reducer
const errorReducer = (state: ErrorState = initialState, action: ErrorAction): ErrorState => {
    switch (action.type) {
        case SET_ERRORS:
            return action.payload; // Return the new error state
        default:
            return state; // Return the current state if action type does not match
    }
};

export default errorReducer;
