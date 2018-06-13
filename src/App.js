import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, withRouter, Switch, Redirect } from "react-router-dom";
import "./App.css";

import Login from "./containers/Login/Login";
import Tasks from "./containers/Tasks/Tasks";

import * as actions from "./store/actions";

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
      this.props.updateStore(token, userId);
    }
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Login} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.token) {
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
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStore: (token, userId) => dispatch(actions.updateStore(token,userId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
