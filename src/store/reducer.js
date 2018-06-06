import * as actionTypes from "./actionTypes"

const initialState = {
  todoList: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      const updatedTodoList = [...state.todoList];
      updatedTodoList.push(action.item);
      return {
        todoList: updatedTodoList
      };
    case actionTypes.DELETE_ITEM:
      const newList = state.todoList.filter(
        item => item.id !== action.item
      );
      return {
        todoList: newList
      };
    default:
      return state;
  }
};

export default reducer;
