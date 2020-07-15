import * as actionTypes from "./actionTypes";
import axios from "axios";

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
    // .. authenticate use
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    dispatch(authStart());

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDe4Mp3rt88XHnWHLbYLpAq5IR9xPXOc_w",
        authData
      )
      .then((res) => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authError(error));
      });
  };
};
