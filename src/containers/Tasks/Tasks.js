import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import CSSTransition from "react-transition-group/CSSTransition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import Task from "../Task/Task";
import Header from "../../components/Header/Header";

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

  renderTasks = () => {
    return this.props.tasks.map(task => {
      if (this.props.location.search === "?tasks=completed") {
        if (task.completed) {
          return (
            <CSSTransition key={task.id} classNames="slide" timeout={300}>
              <Task
                userId={this.props.userId}
                completed={task.completed}
                value={task.value}
                id={task.id}
              />
            </CSSTransition>
          );
        }
      } else if (this.props.location.search === "?tasks=active") {
        if (!task.completed) {
          return (
            <CSSTransition key={task.id} classNames="slide" timeout={300}>
              <Task
                userId={this.props.userId}
                completed={task.completed}
                value={task.value}
                id={task.id}
              />
            </CSSTransition>
          );
        }
      } else {
        return (
          <CSSTransition key={task.id} classNames="slide" timeout={300}>
            <Task
              userId={this.props.userId}
              completed={task.completed}
              value={task.value}
              id={task.id}
            />
          </CSSTransition>
        );
      }
    });
  };

  render() {
    return (
      <div className="tasks">
        <Header clicked={this.props.logout} />
        <div className="tasks__main">
          <div className="tasks__container">
            <div className="tasks__form__container">
              <form className="tasks__form" onSubmit={this.formSubmitHandler}>
                <input
                className="tasks__form__input"
                  value={this.state.task}
                  type="text"
                  placeholder="What needs to be done?"
                  required
                  onChange={this.inputChangeHandler}
                />
              </form>
              <div className="tasks__filters">
                <NavLink
                className="tasks__filters__link"
                  style={
                    this.props.location.search === ""
                      ? {
                          textDecoration: "underline",
                          fontWeight: "700"
                        }
                      : null
                  }
                  exact
                  to={{ pathname: "/tasks" }}
                >
                  All
                </NavLink>
                <NavLink
                className="tasks__filters__link"
                  style={
                    this.props.location.search === "?tasks=active"
                      ? {
                          textDecoration: "underline",
                          fontWeight: "700"
                        }
                      : null
                  }
                  exact
                  to={{ pathname: "/tasks", search: "?tasks=active" }}
                >
                  Active
                </NavLink>
                <NavLink
                className="tasks__filters__link"
                  style={
                    this.props.location.search === "?tasks=completed"
                      ? {
                          textDecoration: "underline",
                          fontWeight: "700"
                        }
                      : null
                  }
                  exact
                  to={{ pathname: "/tasks", search: "?tasks=completed" }}
                >
                  Completed
                </NavLink>
              </div>
            </div>
            <TransitionGroup className="tasks__list__container">
              {this.renderTasks()}
            </TransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: (task, userId) => dispatch(actions.addTask(task, userId)),
    updateTasks: userId => dispatch(actions.updateTasks(userId)),
    logout: () => dispatch(actions.logout())
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
