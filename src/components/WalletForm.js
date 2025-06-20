import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRates, expensesAction, totalAction } from '../redux/actions';

class WalletForm extends Component {
  state = {
    valor: '',
    descricao: '',
    moeda: 'USD',
    metodo: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  resetForm = () => this.setState({
    valor: '',
    descricao: '',
    moeda: 'USD',
    metodo: 'Dinheiro',
    tag: 'Alimentação',
  });

  addExpense = async () => {
    const { dispatch } = this.props;
    await dispatch(fetchRates());
    const { valor, descricao, moeda, metodo, tag } = this.state;
    const { expenses, rates } = this.props;
    const unit = {
      id: expenses.length,
      value: valor,
      description: descricao,
      currency: moeda,
      method: metodo,
      tag,
      exchangeRates: rates,
    };
    dispatch(expensesAction(unit));
    dispatch(totalAction());
    this.resetForm();
  };

  render() {
    const { currencies } = this.props;
    const { valor, descricao, moeda, metodo, tag } = this.state;
    return (
      <form>
        <h3>Adicione a sua despesa</h3>
        <input
          type="text"
          data-testid="value-input"
          placeholder="Valor da despesa"
          name="valor"
          value={ valor }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="description-input"
          placeholder="Descrição da despesa"
          name="descricao"
          value={ descricao }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="moeda"
          value={ moeda }
          onChange={ this.handleChange }
        >
          {currencies ? currencies.map((c, index) => (
            <option key={ index }>{c}</option>
          )) : null }
        </select>
        <select
          data-testid="method-input"
          name="metodo"
          value={ metodo }
          onChange={ this.handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          type="button"
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  rates: state.wallet.rates,
  total: state.wallet.total,
});

WalletForm.propTypes = {
  currencies: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
