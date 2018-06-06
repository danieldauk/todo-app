import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

class Input extends Component {
  state = {
    listItem: {
      value: "",
      completed: false,
      id: ""
    }
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.listItem);

    this.setState({
      listItem: {
        value: "",
        completed: false,
        id: ""
      }
    });
  };

  onChangeHandler = event => {
    const currentDate = new Date().getTime();
    this.setState({
      listItem: {
        completed: false,
        value: event.target.value,
        id: currentDate
      }
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <input
            value={this.state.listItem.value}
            onChange={this.onChangeHandler}
            type="text"
            placeholder="What needs to be done?"
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: item => dispatch(actions.addItem(item))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Input);
