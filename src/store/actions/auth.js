import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    // .. authenticate user
    dispatch(authStart());
  };
};
