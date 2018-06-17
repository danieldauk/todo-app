import React, { Component } from "react";
import "./Email.css";

class Email extends Component {
  state = {
    email: "",
    password: "",
    login: true
  };

  submitHandler = event => {
    event.preventDefault();
    console.log("?");
    this.props.emailAndPasswordAuth(
      this.state.email,
      this.state.password,
      this.state.login
    );
  };

  emailHandler = event => {
    this.setState({ email: event.target.value });
  };

  passwordHandler = event => {
    this.setState({ password: event.target.value });
  };

  signupHandler = () => {
    this.setState({ login: false });
    console.log(this.state);
  };

  loginHandler = () => {
    this.setState({ login: true });
    console.log(this.state);
  };

  render() {
    return (
      <div className="email">
        <div className="email__controls">
          <button
            className={this.state.login ? null : "email__controls--active"}
            onClick={this.signupHandler}
          >
            Sign up
          </button>
          <button
            className={this.state.login ? "email__controls--active" : null}
            onClick={this.loginHandler}
          >
            Log in
          </button>
        </div>
        <form className="email__form" onSubmit={this.submitHandler}>
          <input
            onChange={this.emailHandler}
            type="email"
            required
            placeholder="Email"
          />
          <input
            onChange={this.passwordHandler}
            type="password"
            required
            placeholder="Password"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Email;
