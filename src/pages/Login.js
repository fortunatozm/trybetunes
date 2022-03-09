import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      isDisabled: true,
      isLoad: false,
    };

    this.hendleChange = this.hendleChange.bind(this);
    this.hendleClick = this.hendleClick.bind(this);
  }

  hendleChange(prevName) {
    this.setState({
      loginName: prevName.target.value,
    }, () => {
      const NAME_LENGTH = 3;
      const { loginName } = this.state;
      if (loginName.length >= NAME_LENGTH) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  }

  async hendleClick() {
    this.setState({
      isLoad: true,
    });
    const { loginName } = this.state;
    await createUser({ name: loginName });
    this.setState({
      isLoad: false,
      loginName: '',
    });
    const { history } = this.props;
    history.push('/search');
    console.log('Aqui');
  }

  render() {
    const { loginName, isDisabled, isLoad } = this.state;
    if (isLoad) {
      return <span>Carregando...</span>;
    }
    return (
      <div data-testid="page-login">
        <label htmlFor="login">
          Nome:
          <input
            onChange={ this.hendleChange }
            name="loginName"
            data-testid="login-name-input"
            id="login"
            value={ loginName }
          />
        </label>
        <button
          disabled={ isDisabled }
          data-testid="login-submit-button"
          type="button"
          onClick={ this.hendleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
