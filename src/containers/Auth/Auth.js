import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class Auth extends Component {
  state = {
    email: "",
    password: "",
    login: false
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.props.onLogin(this.state.email, this.state.password, this.state.login);
  };

  emailChangeHandler = event => {
    this.setState({ email: event.target.value });
  };
  passwordChangeHandler = event => {
    this.setState({ password: event.target.value });
  };

  switchToLogIn = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { login: !prevState.login };
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmitHandler}>
          <input
            onChange={this.emailChangeHandler}
            required
            type="email"
            placeholder="Your E-mail"
          />
          <input
            onChange={this.passwordChangeHandler}
            required
            type="password"
            placeholder="Your Password"
          />
          <button>{this.state.login ? "Log in" : "Sign up"}</button>
          <button onClick={this.switchToLogIn}>
            {this.state.login ? "Create account?" : "Have account?"}
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
