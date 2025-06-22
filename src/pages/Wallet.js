import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "../components/Header";
import WalletForm from "../components/WalletForm";
import Table from "../components/Table";
import walletLogo from "../images/walletOlive.png";
import "./Wallet.css";

class Wallet extends React.Component {
  // componentDidMount() {
  //   const { dispatch } = this.props;
  //   dispatch(fetchCurr());
  // }

  render() {
    const { email, wFormDisplay } = this.props;
    return (
      <div className="wallet-page">
        <Header email={email} />
        <div className="title-container">
          <img src={walletLogo} alt="wallet" className="walletLogo" />
          <h1 className="wallet-title">e-Wallet</h1>
        </div>
        {wFormDisplay ? <WalletForm /> : null}
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  wFormDisplay: state.wallet.wFormDisplay,
});

Wallet.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func,
  // }),
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
