import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { expensesAction } from "../redux/actions";
import plus from "../images/plus.png";

class WalletForm extends Component {
  state = {
    valor: "",
    descricao: "",
    metodo: "Dinheiro",
    tag: "Alimentação",
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  resetForm = () =>
    this.setState({
      valor: "",
      descricao: "",
      metodo: "Dinheiro",
      tag: "Alimentação",
    });

  addExpense = async () => {
    const { dispatch } = this.props;
    // await dispatch(fetchRates());
    const { valor, descricao, metodo, tag } = this.state;
    const { expenses } = this.props;
    const unit = {
      id: expenses.length,
      value: valor,
      description: descricao,
      method: metodo,
      tag,
    };
    dispatch(expensesAction(unit));
    // dispatch(totalAction());
    this.resetForm();
  };

  render() {
    // const { currencies } = this.props;
    const { valor, descricao, metodo, tag } = this.state;
    return (
      <form>
        <h3 className="form-title">adicione uma despesa</h3>
        <div>
          <input
            type="text"
            data-testid="value-input"
            placeholder="valor da despesa"
            name="valor"
            value={valor}
            onChange={this.handleChange}
          />
          <input
            type="text"
            data-testid="description-input"
            placeholder="descrição da despesa"
            name="descricao"
            value={descricao}
            onChange={this.handleChange}
          />
          <select
            data-testid="method-input"
            name="metodo"
            value={metodo}
            onChange={this.handleChange}
          >
            <option>dinheiro</option>
            <option>cartão de crédito</option>
            <option>cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={tag}
            onChange={this.handleChange}
          >
            <option>alimentação</option>
            <option>lazer</option>
            <option>trabalho</option>
            <option>transporte</option>
            <option>saúde</option>
          </select>
          <button className="add-btn" type="button" onClick={this.addExpense}>
            <img src={plus} alt="plus-sign" />
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  // currencies: state.wallet.currencies,
  // rates: state.wallet.rates,
  total: state.wallet.total,
});

// WalletForm.propTypes = {
//   currencies: PropTypes.string,
//   title: PropTypes.string,
// }.isRequired;

export default connect(mapStateToProps)(WalletForm);
