import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addItem = item => {
  return dispatch => {
    console.log(item);
    dispatch({
      type: actionTypes.ADD_ITEM,
      item: item
    });
  };
};

export const deleteItem = item => {
  return dispatch => {
    dispatch({
      type: actionTypes.DELETE_ITEM,
      item: item
    });
  };
};

export const updateReduxStore = () => {
  return dispatch => {
    axios
      .get("https://todo-4e47e.firebaseio.com/list.json")
      .then(response => {
        let data = response.data;
        if (data === null) {
          data = [];
        }
        dispatch({
          type: actionTypes.UPDATE_REDUX_STORE,
          list: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const auth = (email, password, login) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAWwnuCaCLmXkfogHKI-rEf3jBzCWGDY5U";

    if (login) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAWwnuCaCLmXkfogHKI-rEf3jBzCWGDY5U";
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail());
      });
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authFail = () => {
  return {
    type: actionTypes.AUTH_FAIL
  };
};

const authSuccess = responseData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    responseData
  };
};

//logout
