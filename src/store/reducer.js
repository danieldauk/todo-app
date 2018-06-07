import * as actionTypes from "./actionTypes";

const initialState = {
  todoList: [],
  userId: "",
  token: "",
  expirationTime: "",
  loading: false
};

const addItem = (state, action) => {
  const updatedTodoList = [...state.todoList];
  updatedTodoList.push(action.item);
  return {
    ...state,
    todoList: updatedTodoList
  };
};

const deleteItem = (state, action) => {
  const newList = state.todoList.filter(item => item.id !== action.item);
  return {
    ...state,
    todoList: newList
  };
};

const updateReduxStore = (state, action) => {
  return {
    ...state,
    todoList: action.list
  };
};

const authStart = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const authSuccess = (state, action) => {

  //calculate token expiration time
  const expirationTime = new Date (new Date().getTime() + action.responseData.expiresIn*1000);


  return {
    ...state,
    userId: action.responseData.localId,
    token: action.responseData.idToken,
    expirationTime: expirationTime,
    loading: false
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return addItem(state, action);
    case actionTypes.DELETE_ITEM:
      return deleteItem(state, action);
    case actionTypes.UPDATE_REDUX_STORE:
      return updateReduxStore(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
