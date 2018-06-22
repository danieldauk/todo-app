import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import './Login.css';
import OAuth from '../../components/LoginMethods/OAuth/OAuth';
import Email from '../../components/LoginMethods/Email/Email';

class Login extends Component {
  componentDidUpdate() {
    if (this.props.userId !== '') {
      this.props.history.push('/tasks');
    }
  }
  render() {
    console.log(this.props);
    const {
      emailAndPasswordAuth,
      githubAuth,
      googleAuth,
      anonymousAuth,
      error,
      errorMessage,
    } = this.props;
    return (
      <div className="login">
        <div className="login__container">
          <Email emailAndPasswordAuth={emailAndPasswordAuth} />
          <div>
            <OAuth provider="Github" clicked={githubAuth} />
            <OAuth provider="Google" clicked={googleAuth} />
            <OAuth provider="Anonymous" clicked={anonymousAuth} />
          </div>
          <div className="login__error">
            <p className="login__error__message">{error ? errorMessage : null}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.userId,
  error: state.error,
  errorMessage: state.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  githubAuth: () => dispatch(actions.githubAuth()),
  googleAuth: () => dispatch(actions.googleAuth()),
  facebookAuth: () => dispatch(actions.facebookAuth()),
  anonymousAuth: () => dispatch(actions.anonymousAuth()),
  emailAndPasswordAuth: (email, password, login) =>
    dispatch(actions.emailAndPasswordAuth(email, password, login)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
