import * as actionTypes from './actionTypes';

const initialState = {
  error: false,
  errorMessage: '',
  userId: '',
  tasks: [],
};

const authSuccess = (state, action) => ({
  ...state,
  userId: action.userId,
});

const authFail = (state, action) => ({
  ...state,
  error: true,
  errorMessage: action.errorMessage,
});

const updateStore = (state, action) => ({
  ...state,
  userId: action.userId,
});

const addTask = (state, action) => {
  const updatedTasksArr = [...state.tasks];
  updatedTasksArr.push(action.task);

  return {
    ...state,
    tasks: updatedTasksArr,
  };
};

const removeTask = (state, action) => {
  const updatedTasksArr = state.tasks.filter(task => task.id !== action.taskId);

  return {
    ...state,
    tasks: updatedTasksArr,
  };
};

const updateTasks = (state, action) => {
  const tasks = [];
  for (const task in action.data) {
    tasks.push(action.data[task]);
  }
  return {
    ...state,
    tasks,
  };
};

const modifyTask = (state, action) => {
  const tasks = [...state.tasks];
  const modifiedTasks = tasks.map((task) => {
    if (task.id === action.modifiedTask.id) {
      return action.modifiedTask;
    }
    return task;
  });
  return {
    ...state,
    tasks: modifiedTasks,
  };
};

const logout = () => ({
  error: false,
  errorMessage: '',
  userId: '',
  tasks: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.UPDATE_STORE:
      return updateStore(state, action);
    case actionTypes.ADD_TASK:
      return addTask(state, action);
    case actionTypes.UPDATE_TASKS:
      return updateTasks(state, action);
    case actionTypes.REMOVE_TASK:
      return removeTask(state, action);
    case actionTypes.MODIFY_TASK:
      return modifyTask(state, action);
    case actionTypes.LOGOUT:
      return logout();
    default:
      return state;
  }
};

export default reducer;
