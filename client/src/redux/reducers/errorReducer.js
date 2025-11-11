import { SET_ERRORS, ADMIN_LOGIN, ADD_ADMIN, UPDATE_ADMIN } from "../actionTypes";

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload || {};
    case ADMIN_LOGIN:
    case ADD_ADMIN:
    case UPDATE_ADMIN:
      return {}; // Clear errors on success
    default:
      return state;
  }
};

export default errorReducer;
