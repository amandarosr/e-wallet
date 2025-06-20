import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { inputChange } from "../redux/actions/index";

class Login extends React.Component {
  state = {
    emailInput: "",
    passInput: "",
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      this.validateInputs
    );
  };

  validateInputs = () => {
    const { emailInput, passInput } = this.state;
    const pattern =
      /[a-zA-Z0-9]+[\\.]?([a-zA-Z0-9]+)?[\\@][a-z]{3,9}[\\.][a-z]{2,5}/g;
    const validateEmail = pattern.test(emailInput);
    const num = 5;
    const cases = [validateEmail, passInput.length > num];
    const validateAll = cases.every((i) => i !== false);
    this.setState({
      isDisabled: !validateAll,
    });
  };

  sendToStore = () => {
    const { emailInput } = this.state;
    const { dispatch, history } = this.props;
    dispatch(inputChange("email", emailInput));
    history.push("/carteira");
  };

  render() {
    const { emailInput, passInput, isDisabled } = this.state;
    // const { history } = this.props;
    return (
      <div className="login-container">
        <h1 className="login-title">Login</h1>
        <div>
          <label htmlFor="email" className="input-container">
            e-mail
            <input
              type="email"
              data-testid="email-input"
              placeholder="example@email.com"
              id="email"
              name="emailInput"
              value={emailInput}
              onChange={this.handleChange}
            />
          </label>
          <label htmlFor="senha" className="input-container">
            senha
            <input
              type="password"
              data-testid="password-input"
              placeholder="abc123"
              id="senha"
              name="passInput"
              value={passInput}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button
          className="login-submit"
          type="button"
          disabled={isDisabled}
          onClick={this.sendToStore}
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Login);
