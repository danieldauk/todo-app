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
          if(data===null){
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
