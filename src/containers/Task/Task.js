import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import "./Task.css";

class Task extends Component {
  state = {
    edit: false,
    value: this.props.value,
    completed: this.props.completed
  };

  editModeHandler = event => {
    event.preventDefault();
    if (this.state.edit) {
      this.props.modifyTask(
        this.props.id,
        this.props.userId,
        this.state.value,
        this.state.completed
      );
    }
    this.setState(prevState => {
      return { edit: !prevState.edit };
    });
  };

  inputChangeHandler = event => {
    this.setState({ value: event.target.value });
  };

  checkHandler = () =>{
    this.setState(prevState=>{
        this.props.modifyTask(
            this.props.id,
            this.props.userId,
            this.state.value,
            !prevState.completed
          );
        return{completed: !prevState.completed}
    });
    
}

  render() {
    let task = (
      <div className="task-container">
        <button onClick={this.checkHandler}>Checkr: {String(this.props.completed)}</button>
        <div>{this.props.value}</div>
        <button onClick={this.editModeHandler}>Edit</button>
        <button
          onClick={() =>
            this.props.removeTask(this.props.id, this.props.userId)
          }
        >
          Remove
        </button>
      </div>
    );

    if (this.state.edit) {
      task = (
        <div className="task-container">
          <form onSubmit={this.editModeHandler}>
            <input
              onChange={this.inputChangeHandler}
              type="text"
              value={this.state.value}
            />{" "}
            <button>Exit edit</button>
          </form>
        </div>
      );
    }

    return task;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeTask: (task, userId) => dispatch(actions.removeTask(task, userId)),
    modifyTask: (taskId, userId, value, completed) =>
      dispatch(actions.modifyTask(taskId, userId, value, completed))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Task);
