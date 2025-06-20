import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { fetchCurr } from '../redux/actions';
import "./Wallet.css";

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurr());
  }

  render() {
    const { email, currencies, total, wFormDisplay } = this.props;
    return (
      <div className="wallet-page">
        <Header email={ email } total={ total } />
        <h1>e-Wallet</h1>
        { wFormDisplay ? (
          <WalletForm currencies={ currencies } title="WalletForm" />
        ) : null }
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  total: state.wallet.total,
  wFormDisplay: state.wallet.wFormDisplay,
});

Wallet.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }),
  email: PropTypes.string,
  currencies: PropTypes.arrayOf(
    PropTypes.shape(
      PropTypes.string,
    ),
  ),
  total: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
