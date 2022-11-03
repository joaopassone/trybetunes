import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const { loginNameInput, onInputChange,
      isLoginButtonDisabled, onEnterButtonClick } = this.props;

    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Nome
            <input
              type="text"
              name="loginNameInput"
              id="login-name-input"
              value={ loginNameInput }
              onChange={ onInputChange }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="button"
            name="loginSubmitButton"
            id="login-submit-button"
            onClick={ onEnterButtonClick }
            disabled={ isLoginButtonDisabled }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginNameInput: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  isLoginButtonDisabled: PropTypes.bool.isRequired,
  onEnterButtonClick: PropTypes.func.isRequired,
};

export default Login;
