import React, { Component } from "react";
import { connect } from "react-redux";
import Task from "../Task/Task";

import * as actions from "../../store/actions";

import "./Tasks.css";

class Tasks extends Component {
  state = {
    task: ""
  };

  componentDidMount() {
    this.props.updateTasks(this.props.userId);
  }

  inputChangeHandler = event => {
    this.setState({ task: event.target.value });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.props.addTask(this.state.task, this.props.userId);
    this.setState({ task: "" });
  };



  render() {
    let tasks = this.props.tasks.map(task => {
      return (
        <Task
          userId={this.props.userId}
          completed={task.completed}
          value={task.value}
          id={task.id}
          key={task.id}
        />
      );
    });

    return (
      <div className="tasks-container">
        <div className="form-container">
          <form onSubmit={this.formSubmitHandler}>
            <input
              value={this.state.task}
              type="text"
              placeholder="What needs to be done?"
              required
              onChange={this.inputChangeHandler}
            />
          </form>
        </div>
        <div className="task-list-container">{tasks}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: (task, userId) => dispatch(actions.addTask(task, userId)),
    updateTasks: userId => dispatch(actions.updateTasks(userId))
  };
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    userId: state.userId
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);
