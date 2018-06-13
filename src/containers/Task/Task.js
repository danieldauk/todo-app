import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import * as Octicons from "react-icons/lib/go";

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

  checkHandler = () => {
    this.setState(prevState => {
      this.props.modifyTask(
        this.props.id,
        this.props.userId,
        this.state.value,
        !prevState.completed
      );
      return { completed: !prevState.completed };
    });
  };

  render() {
    //icons;
    //GoCheck
    //GoPencil
    //GoTrachcan
    //GoX

    const checkStyle = {
      height: "30px",
      width: "30px",
      fill: "#3ECEFF"
    };

    const iconStyle = {
      height: "25px",
      width: "25px",
      fill: "#3ECEFF"
    };
    let task = (
      <div className="task-container">
        <div className="task-value">{this.props.value}</div>
        <button onClick={this.editModeHandler}>
          {<Octicons.GoPencil style={iconStyle} />}
        </button>
      </div>
    );

    if (this.state.edit) {
      task = (
        <form className="task-container" onSubmit={this.editModeHandler}>
          <input
            onChange={this.inputChangeHandler}
            type="text"
            value={this.state.value}
          />{" "}
          <button>Exit edit</button>
        </form>
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
