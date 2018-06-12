import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

import "./Login.css";
import OAuth from "../../components/LoginMethods/OAuth/OAuth";

class Login extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="login-container">
        <h3>Sign in</h3>
        <div className="login-methods-container">
          <OAuth provider="Github" clicked={this.props.githubAuth} />
          <OAuth provider="Google" clicked={this.props.googleAuth} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    githubAuth: () => dispatch(actions.githubAuth()),
    googleAuth: () =>dispatch(actions.googleAuth())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
