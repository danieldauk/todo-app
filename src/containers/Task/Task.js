import React, { Component } from 'react';
import * as Octicons from 'react-icons/lib/go';
import { connect } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';

import * as actions from '../../store/actions';

import './Task.css';

class Task extends Component {
  state = {
    edit: false,
    value: this.props.value,
    completed: this.props.completed,
  };

  editModeHandler = (event) => {
    event.preventDefault();
    if (this.state.edit && this.state.value === '') {
      this.props.removeTask(this.props.id, this.props.userId);
    } else if (this.state.edit) {
      this.props.modifyTask(
        this.props.id,
        this.props.userId,
        this.state.value,
        this.state.completed,
      );
    }
    this.setState(prevState => ({ edit: !prevState.edit }));
  };

  inputChangeHandler = (event) => {
    this.setState({ value: event.target.value });
  };

  checkHandler = (event) => {
    event.preventDefault();
    this.setState((prevState) => {
      this.props.modifyTask(
        this.props.id,
        this.props.userId,
        this.state.value,
        !prevState.completed,
      );
      return { completed: !prevState.completed };
    });
  };

  removeTaskHandler = (event) => {
    event.preventDefault();
    this.props.removeTask(this.props.id, this.props.userId);
  };

  inputLengthHandler = (str) => {
    const mq = window.matchMedia('(max-width: 520px)');
    const maxLength = mq.matches ? 10 : 20;

    if (str.length > maxLength) {
      return `${str.slice(0, maxLength)}...`;
    }
    return str;
  };

  renderEdit = () => {
    const iconStyle = {
      height: '25px',
      width: '25px',
      fill: '#3ECEFF',
    };
    return (
      <form className="task__form" onSubmit={this.editModeHandler}>
        <input
          className="task__form__input"
          autoFocus
          style={this.state.completed ? { textDecoration: 'line-through', opacity: 0.5 } : null}
          onChange={this.inputChangeHandler}
          type="text"
          value={this.state.value}
        />{' '}
        <div className="task__edit">
          <button className="task__edit__button" onClick={this.checkHandler}>
          <div className="task__iconfix">{<Octicons.GoCheck style={iconStyle} />}</div>
          </button>
          <button className="task__edit__button">
          <div className="task__iconfix">{<Octicons.GoX style={iconStyle} />}</div>
          </button>
          <button className="task__edit__button" onClick={this.removeTaskHandler}>
            <div className="task__iconfix">{<Octicons.GoTrashcan style={iconStyle} />}</div>
          </button>
        </div>
      </form>
    );
  };

  renderView = () => {
    const iconStyle = {
      height: '20px',
      width: '20px',
      fill: '#3ECEFF',
    };
    return (
      <div className="task__form">
        <div
          style={this.state.completed ? { textDecoration: 'line-through', opacity: 0.5 } : null}
          className="task__value"
        >
          {this.inputLengthHandler(this.props.value)}
        </div>
        <button className="task__form__button" onClick={this.editModeHandler}>
        <div className="task__iconfix"> {<Octicons.GoPencil style={iconStyle} />}</div>
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

const mapDispatchToProps = dispatch => ({
  removeTask: (taskId, userId) => dispatch(actions.removeTask(taskId, userId)),
  modifyTask: (taskId, userId, value, completed) =>
    dispatch(actions.modifyTask(taskId, userId, value, completed)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Task);
