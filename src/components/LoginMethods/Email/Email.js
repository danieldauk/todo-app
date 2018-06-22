import React, { Component } from 'react';
import './Email.css';

class Email extends Component {
  state = {
    email: '',
    password: '',
    login: true,
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.emailAndPasswordAuth(this.state.email, this.state.password, this.state.login);
  };

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  signupHandler = () => {
    this.setState({ login: false });
  };

  loginHandler = () => {
    this.setState({ login: true });
  };

  render() {
    return (
      <div className="email">
        <div className="email__controls">
          <button
            className={
              this.state.login ? 'email__controls__button' : 'email__controls__button--active'
            }
            onClick={this.signupHandler}
          >
            Sign up
          </button>
          <button
            className={
              this.state.login ? 'email__controls__button--active' : 'email__controls__button'
            }
            onClick={this.loginHandler}
          >
            Log in
          </button>
        </div>
        <form className="email__form" onSubmit={this.submitHandler}>
          <input
            className="email__form__input"
            onChange={this.emailHandler}
            type="email"
            required
            placeholder="Email"
          />
          <input
            className="email__form__input"
            onChange={this.passwordHandler}
            type="password"
            required
            placeholder="Password"
          />
          <button className="email__form__button">Submit</button>
        </form>
      </div>
    );
  }
}

export default Email;
