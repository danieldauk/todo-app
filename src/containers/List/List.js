import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import axios from "axios";

class List extends Component {

  componentDidMount(){
    this.props.updateReduxStore();
  }

  componentDidUpdate(){
    axios.put('https://todo-4e47e.firebaseio.com/list.json', this.props.todoList)
  }

  render() {
    const listItems = this.props.todoList.map(item => {
      return (
        <li onClick={() => this.props.deleteItem(item.id)} key={item.id}>
          {item.value}
        </li>
      );
    });

    return (
      <div>
        <ul>{listItems}</ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: item => dispatch(actions.deleteItem(item)),
    updateReduxStore: ()=>dispatch(actions.updateReduxStore())
  };
};

const mapStateToProps = state => {
  return {
    todoList: state.todoList
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
