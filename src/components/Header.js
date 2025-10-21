import React, { Component } from 'react';
import PropTypes from 'prop-types';
import walletLogo from "../images/walletOlive.png";

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <div className="title-container">
                  <img src={walletLogo} alt="wallet" className="walletLogo" />
                  <h1 className="wallet-title">e-Wallet</h1>
                </div>
        <h3 className="email-title" data-testid="email-field">usuário: <strong>{ email }</strong></h3>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

export default Header;
