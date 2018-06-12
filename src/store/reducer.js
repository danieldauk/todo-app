import * as actionTypes from "./actionTypes";



const initialState = {
  token: "",
  error: false,
  errorMessage: "",
  userId: "",
  tasks: []
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: true,
    errorMessage: action.errorMessage
  };
};

const updateStore = (state, action) => {
  console.log(action);
  return {
    ...state,
    token: action.token,
    userId: action.userId
  };
};

const addTask = (state,action) =>{
  return {
    ...state,
    tasks: action.tasks
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.UPDATE_STORE:
      return updateStore(state, action);
    case actionTypes.ADD_TASK:
    return addTask(state,action);
    default:
      return state;
  }
};

export default reducer;
