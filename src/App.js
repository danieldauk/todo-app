import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Login from "./containers/Login/Login";
import Tasks from "./containers/Tasks/Tasks";

import * as actions from "./store/actions";

class App extends Component {
  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      this.props.updateStore(userId);
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.userId) {
      routes = (
        <Switch>
          <Route path="/tasks" exact component={Tasks} />
          <Redirect to="/tasks" />
        </Switch>
      );
    }
    return <div className="App">{routes}</div>;
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStore: (userId) => dispatch(actions.updateStore(userId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
