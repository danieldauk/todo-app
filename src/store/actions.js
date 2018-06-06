import * as actionTypes from "./actionTypes";

export const addItem = (item)=>{

    return dispatch =>{
        console.log(item);
        dispatch({
            type: actionTypes.ADD_ITEM,
            item: item
        })
    }
}

export const deleteItem = (item)=>{

    return dispatch =>{
        dispatch({
            type: actionTypes.DELETE_ITEM,
            item: item
        })
    }
}