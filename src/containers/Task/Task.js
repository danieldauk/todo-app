import React, { Component } from "react";
import { connect } from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition";

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
    if (this.state.edit && this.state.value === "") {
      this.props.removeTask(this.props.id, this.props.userId);
    } else if (this.state.edit) {
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

  checkHandler = event => {
    event.preventDefault();
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

  removeTaskHandler = event => {
    event.preventDefault();
    this.props.removeTask(this.props.id, this.props.userId);
  };

  renderEdit = () => {
    const iconStyle = {
      height: "25px",
      width: "25px",
      fill: "#3ECEFF"
    };
    return (
      <form className="task__form" onSubmit={this.editModeHandler}>
        <input
        className="task__form__input"
          autoFocus
          style={
            this.state.completed
              ? { textDecoration: "line-through", opacity: 0.5 }
              : null
          }
          onChange={this.inputChangeHandler}
          type="text"
          value={this.state.value}
        />{" "}
        <div className="task__edit">
          <button 
          className="task__edit__button"
          onClick={this.checkHandler}>
            {<Octicons.GoCheck style={iconStyle} />}
          </button>
          <button
          className="task__edit__button"
          >{<Octicons.GoX style={iconStyle} />}</button>
          <button 
          className="task__edit__button"
          onClick={this.removeTaskHandler}>
            {<Octicons.GoTrashcan style={iconStyle} />}
          </button>
        </div>
      </form>
    );
  };

  renderView = () => {
    const iconStyle = {
      height: "20px",
      width: "20px",
      fill: "#3ECEFF"
    };
    return (
      <div className="task__form">
        <div
          style={
            this.state.completed
              ? { textDecoration: "line-through", opacity: 0.5 }
              : null
          }
          className="task__value"
        >
          {this.props.value}
        </div>
        <button
        className="task__form__button"
        onClick={this.editModeHandler}>
          {<Octicons.GoPencil style={iconStyle} />}
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="task">
        <CSSTransition
          unmountOnExit
          mountOnEnter
          in={this.state.edit}
          timeout={300}
          classNames="edit-mode"
        >
          {this.renderEdit()}
        </CSSTransition>
        <CSSTransition
          unmountOnExit
          mountOnEnter
          in={!this.state.edit}
          timeout={300}
          classNames="view-mode"
        >
          {this.renderView()}
        </CSSTransition>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeTask: (taskId, userId) =>
      dispatch(actions.removeTask(taskId, userId)),
    modifyTask: (taskId, userId, value, completed) =>
      dispatch(actions.modifyTask(taskId, userId, value, completed))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Task);
