import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    loginNameInput: '',
    isLoginButtonDisabled: true,
    isLoading: false,
    isLogged: false,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
      isLoginButtonDisabled: (value.length <= 2),
    });
  };

  onEnterButtonClick = () => {
    const { loginNameInput } = this.state;

    this.setState({ isLoading: true }, async () => {
      await createUser({ name: loginNameInput });
      this.setState({
        isLoading: false,
        isLogged: true,
      });
    });
  };

  render() {
    const { loginNameInput, isLoginButtonDisabled, isLoading, isLogged } = this.state;
    const loginForm = (
      <form>
        <label htmlFor="login-name-input">
          Nome
          <input
            type="text"
            name="loginNameInput"
            id="login-name-input"
            value={ loginNameInput }
            onChange={ this.onInputChange }
            data-testid="login-name-input"
          />
        </label>
        <button
          type="button"
          name="loginSubmitButton"
          id="login-submit-button"
          onClick={ this.onEnterButtonClick }
          disabled={ isLoginButtonDisabled }
          data-testid="login-submit-button"
        >
          Entrar
        </button>
      </form>
    );

    return (
      <div data-testid="page-login">
        { isLogged ? <Redirect to="/search" /> : null }
        { isLoading ? <Loading /> : loginForm }
      </div>
    );
  }
}

export default Login;
