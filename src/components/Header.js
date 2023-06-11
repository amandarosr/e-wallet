import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <span data-testid="total-field">{ total.toFixed(2) }</span>
        <span data-testid="header-currency-field"> BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

export default Header;
