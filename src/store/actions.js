import firebase from "firebase";
import firebaseConfig from "../Firebase/firebaseConfig";
import * as actionTypes from "./actionTypes";

const app = firebase.initializeApp(firebaseConfig);

export const githubAuth = () => {
  return dispatch => {
    const provider = new firebase.auth.GithubAuthProvider();
    dispatch(auth(provider));
  };
};

export const googleAuth = () => {
  return dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider();
    dispatch(auth(provider));
  };
};

export const auth = provider => {
  return dispatch => {
    app
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user.uid);
        dispatch(authSuccess(token));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(authFail(errorMessage));
        console.log(errorMessage);
      });
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token
  };
};
export const authFail = errorMessage => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMessage
  };
};
