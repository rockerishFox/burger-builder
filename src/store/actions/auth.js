import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    error: error,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    // .. authenticate use
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    dispatch(authStart());

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDe4Mp3rt88XHnWHLbYLpAq5IR9xPXOc_w";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDe4Mp3rt88XHnWHLbYLpAq5IR9xPXOc_w";
    }

    axios
      .post(url, authData)
      .then((res) => {
        // console.log(res.data);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(authError(error.response.data.error));
      });
  };
};
