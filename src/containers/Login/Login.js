import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import "./Login.css";
import OAuth from "../../components/LoginMethods/OAuth/OAuth";

class Login extends Component {
  componentDidUpdate() {
    if (this.props.token !== "") {
      this.props.history.push("/tasks");
    }
  }
  render() {
    return (
      <div className="login-container">
        <h3>Sign in</h3>
        <div className="login-methods-container">
          <OAuth provider="Github" clicked={this.props.githubAuth} />
          <OAuth provider="Google" clicked={this.props.googleAuth} />
          <OAuth provider="Facebook" clicked={this.props.facebookAuth} />
          <OAuth provider="Anonymous" clicked={this.props.anonymousAuth} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state =>{
    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
  return {
    githubAuth: () => dispatch(actions.githubAuth()),
    googleAuth: () => dispatch(actions.googleAuth()),
    facebookAuth: () => dispatch(actions.facebookAuth()),
    anonymousAuth: () => dispatch(actions.anonymousAuth())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
