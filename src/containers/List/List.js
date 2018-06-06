import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

class List extends Component {
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
    deleteItem: item => dispatch(actions.deleteItem(item))
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
