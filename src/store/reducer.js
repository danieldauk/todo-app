import * as actionTypes from "./actionTypes";


const initialState = {
  token:"",
  error: false,
  errorMessage: ""
};

const authSuccess = (state, action) =>{
  localStorage.setItem("token", action.token);

  return {
    ...state,
    token: action.token
  }
}

const authFail = (state, action) =>{
  return {
    ...state,
    error: true,
    errorMessage: action.errorMessage
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
    return authSuccess(state,action);
    case actionTypes.AUTH_FAIL:
    return authFail(state, action);
    default:
      return state;
  }
};

export default reducer;
