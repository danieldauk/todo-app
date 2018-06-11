import firebase from "firebase";
import firebaseConfig from "../Firebase/firebaseConfig";

export const githubAuth = () => {
  return dispatch => {
    const app = firebase.initializeApp(firebaseConfig);

    const provider = new firebase.auth.GithubAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const token = result.credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        console.log(token);
        console.log(user);
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;

        console.log(errorMessage);
      });
  };
};
