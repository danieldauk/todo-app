import firebase from "firebase";
import firebaseConfig from "../Firebase/firebaseConfig";
import * as actionTypes from "./actionTypes";

const app = firebase.initializeApp(firebaseConfig);

export const modifyTask = (taskId, userId, value, completed) => {
  return dispatch => {
    const rootRef = app.database().ref(userId);
    const modifiedTask = {
      value,
      id: taskId,
      completed
    };
    rootRef
      .orderByChild("id")
      .equalTo(taskId)
      .once("value")
      .then(snapshot => {
        const child = Object.keys(snapshot.val())[0];
        rootRef
          .child(child)
          .set(modifiedTask)
          .then(() => {
            dispatch({ type: actionTypes.MODIFY_TASK, modifiedTask });
          });
      });
  };
};

export const updateTasks = userId => {
  return dispatch => {
    app
      .database()
      .ref(userId)
      .once("value", snapshot => {
        const data = snapshot.val();

        dispatch({ type: actionTypes.UPDATE_TASKS, data });
      });
  };
};

export const removeTask = (taskId, userId) => {
  return dispatch => {
    const rootRef = app.database().ref(userId);
    rootRef
      .orderByChild("id")
      .equalTo(taskId)
      .once("value")
      .then(snapshot => {
        const child = Object.keys(snapshot.val())[0];
        rootRef
          .child(child)
          .remove()
          .then(() => {
            dispatch({ type: actionTypes.REMOVE_TASK, taskId });
          });
      });
  };
};

export const addTask = (task, userId) => {
  return dispatch => {
    const taskObj = {
      value: task,
      completed: false,
      id: new Date().getTime()
    };

    const userTasksRef = app.database().ref(userId);
    userTasksRef
      .push(taskObj)
      .then(() => {
        dispatch({ type: actionTypes.ADD_TASK, task: taskObj });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const updateStore = userId => {
  return {
    type: actionTypes.UPDATE_STORE,
    userId
  };
};

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

export const facebookAuth = () => {
  return dispatch => {
    const provider = new firebase.auth.FacebookAuthProvider();
    dispatch(auth(provider));
  };
};

export const emailAndPasswordAuth = (email, password, login) => {
  
console.log(login);
  return dispatch => {
    if (login) {
      console.log("logging in");
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          const userId = response.user.uid;
          dispatch(authSuccess(userId));
        })
        .catch(function(error) {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          const userId = response.user.uid;
          dispatch(authSuccess(userId));

          //implement log in (not sign in)
        })
        .catch(function(error) {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };
};

export const anonymousAuth = () => {
  return dispatch => {
    app.auth().onAuthStateChanged(user => {
      if (user.isAnonymous) {
        const userId = user.uid;
        dispatch(authSuccess(userId));
      }
    });
    app
      .auth()
      .signInAnonymously()
      .catch(error => {
        const errorMessage = error.message;
        dispatch(authFail(errorMessage));
        console.log(errorMessage);
      });
  };
};

export const auth = provider => {
  return dispatch => {
    app
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const userId = result.user.uid;
        dispatch(authSuccess(userId));
      })
      .catch(error => {
        const errorMessage = error.message;
        dispatch(authFail(errorMessage));
        console.log(errorMessage);
      });
  };
};

export const authSuccess = userId => {
  console.log(userId);
  localStorage.setItem("userId", userId);

  return {
    type: actionTypes.AUTH_SUCCESS,
    userId
  };
};
export const authFail = errorMessage => {
  return {
    type: actionTypes.AUTH_FAIL,
    errorMessage
  };
};

export const logout = () => {
  localStorage.removeItem("userId");
  return {
    type: actionTypes.LOGOUT
  };
};
