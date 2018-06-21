import firebase from 'firebase';
import firebaseConfig from '../Firebase/firebaseConfig';
import * as actionTypes from './actionTypes';

const app = firebase.initializeApp(firebaseConfig);

export const modifyTask = (taskId, userId, value, completed) => (dispatch) => {
  const rootRef = app.database().ref(userId);
  const modifiedTask = {
    value,
    id: taskId,
    completed,
  };
  rootRef
    .orderByChild('id')
    .equalTo(taskId)
    .once('value')
    .then((snapshot) => {
      const child = Object.keys(snapshot.val())[0];
      rootRef
        .child(child)
        .set(modifiedTask)
        .then(() => {
          dispatch({ type: actionTypes.MODIFY_TASK, modifiedTask });
        });
    });
};

export const updateTasks = userId => (dispatch) => {
  app
    .database()
    .ref(userId)
    .once('value', (snapshot) => {
      const data = snapshot.val();

      dispatch({ type: actionTypes.UPDATE_TASKS, data });
    });
};

export const removeTask = (taskId, userId) => (dispatch) => {
  const rootRef = app.database().ref(userId);
  rootRef
    .orderByChild('id')
    .equalTo(taskId)
    .once('value')
    .then((snapshot) => {
      const child = Object.keys(snapshot.val())[0];
      rootRef
        .child(child)
        .remove()
        .then(() => {
          dispatch({ type: actionTypes.REMOVE_TASK, taskId });
        });
    });
};

export const addTask = (task, userId) => (dispatch) => {
  const taskObj = {
    value: task,
    completed: false,
    id: new Date().getTime(),
  };

  const userTasksRef = app.database().ref(userId);
  userTasksRef
    .push(taskObj)
    .then(() => {
      dispatch({ type: actionTypes.ADD_TASK, task: taskObj });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateStore = userId => ({
  type: actionTypes.UPDATE_STORE,
  userId,
});

export const githubAuth = () => (dispatch) => {
  const provider = new firebase.auth.GithubAuthProvider();
  dispatch(auth(provider));
};

export const googleAuth = () => (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  dispatch(auth(provider));
};

export const facebookAuth = () => (dispatch) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  dispatch(auth(provider));
};

export const emailAndPasswordAuth = (email, password, login) => {
  console.log(login);
  return (dispatch) => {
    if (login) {
      console.log('logging in');
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          const userId = response.user.uid;
          dispatch(authSuccess(userId));
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      app
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          const userId = response.user.uid;
          dispatch(authSuccess(userId));

          // implement log in (not sign in)
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };
};

export const anonymousAuth = () => (dispatch) => {
  app
    .auth()
    .signInAnonymously()
    .then((response) => {
      const userId = response.user.uid;
      dispatch(authSuccess(userId));
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatch(authFail(errorMessage));
      console.log(errorMessage);
    });
};

export const linkAccounts = (email, credential) => (dispatch) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ login_hint: email });
  app
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      response.user.linkAndRetrieveDataWithCredential(credential);
      const userId = response.user.uid;
      dispatch(authSuccess(userId));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const auth = provider => (dispatch) => {
  app
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      const userId = result.user.uid;
      dispatch(authSuccess(userId));
    })
    .catch((error) => {
      const errorMessage = error.message;
      dispatch(authFail(errorMessage));
      console.log(errorMessage);
      console.log(error.email);
      console.log(error);
      console.log(error.credential);

      if (error.code === 'auth/account-exists-with-different-credential') {
        const link = window.confirm('Account exists with different credential. Please sign in with Google account to link accounts');
        if (link) {
          // https://firebase.google.com/docs/auth/web/google-signin
          dispatch(linkAccounts(error.email, error.credential));
        }
      }
    });
};

export const authSuccess = (userId) => {
  console.log(userId);
  localStorage.setItem('userId', userId);

  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
  };
};
export const authFail = errorMessage => ({
  type: actionTypes.AUTH_FAIL,
  errorMessage,
});

export const logout = () => {
  localStorage.removeItem('userId');
  app.auth().signOut();
  return {
    type: actionTypes.LOGOUT,
  };
};
