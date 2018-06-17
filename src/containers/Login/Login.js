import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import "./Login.css";
import OAuth from "../../components/LoginMethods/OAuth/OAuth";
import Email from "../../components/LoginMethods/Email/Email";

class Login extends Component {
  componentDidUpdate() {
    if (this.props.userId !== "") {
      this.props.history.push("/tasks");
    }
  }
  render() {
    return (
      <div className="login">
        <div className="login-container">
          <Email emailAndPasswordAuth={this.props.emailAndPasswordAuth} />
          <div className="login-methods-container">
            <OAuth provider="Github" clicked={this.props.githubAuth} />
            <OAuth provider="Google" clicked={this.props.googleAuth} />
            <OAuth provider="Facebook" clicked={this.props.facebookAuth} />
            <OAuth provider="Anonymous" clicked={this.props.anonymousAuth} />
            
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    githubAuth: () => dispatch(actions.githubAuth()),
    googleAuth: () => dispatch(actions.googleAuth()),
    facebookAuth: () => dispatch(actions.facebookAuth()),
    anonymousAuth: () => dispatch(actions.anonymousAuth()),
    emailAndPasswordAuth: (email, password, login) =>
      dispatch(actions.emailAndPasswordAuth(email, password, login))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
