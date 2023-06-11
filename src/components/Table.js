import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAction, totalAction, editExpAction,
  displayDFormAction, displayEFormAction } from '../redux/actions';
import './Table.css';

class Table extends Component {
  state = {
    valor: '',
    descricao: '',
    moeda: '',
    metodo: '',
    tag: '',
    editId: '',
  };

  deleteExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const rowId = target.parentNode.parentNode.id;
    const newExp = expenses.filter((e) => e.id !== parseFloat(rowId));
    // newExp.forEach((e, index) => {
    //   e.id = index;
    // });
    dispatch(deleteAction(newExp));
    dispatch(totalAction());
  };

  editExpense = ({ target }) => {
    const targetId = target.parentNode.parentNode.id;
    const { expenses, dispatch } = this.props;
    this.setState({
      editId: targetId,
      moeda: expenses[parseFloat(targetId)].currency,
      metodo: expenses[parseFloat(targetId)].method,
      tag: expenses[parseFloat(targetId)].tag,
      // descricao: expenses[parseFloat(targetId)].description,
      valor: expenses[parseFloat(targetId)].value,
    });
    dispatch(displayEFormAction());
  };

  editExpenseState = () => {
    const { dispatch, expenses } = this.props;
    const { valor, descricao, moeda, metodo,
      tag, editId } = this.state;
    const real = parseFloat(editId);
    const editedExp = {
      id: expenses[real].id,
      currency: moeda,
      exchangeRates: expenses[real].exchangeRates,
      method: metodo,
      tag,
      value: valor,
      description: descricao,
    };
    const newExp = expenses.map((e) => (
      e.id === real ? editedExp : e
    ));
    dispatch(editExpAction(newExp));
    dispatch(totalAction());
    dispatch(displayDFormAction());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { expenses, currencies, formDisplay } = this.props;
    const { valor, descricao, metodo, moeda, tag } = this.state;
    return (
      <div>
        <h3>Table</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses ? expenses.map((e) => (
              <tr key={ e.id } id={ e.id }>
                <td>{ e.description }</td>
                <td>{ e.tag }</td>
                <td>{ e.method }</td>
                <td>{ parseFloat(e.value).toFixed(2) }</td>
                <td>{ e.exchangeRates[e.currency].name }</td>
                <td>{ parseFloat(e.exchangeRates[e.currency].ask).toFixed(2) }</td>
                <td>
                  { (parseFloat(e.value) * parseFloat(e.exchangeRates[e.currency].ask))
                    .toFixed(2) }
                </td>
                <td>Real</td>
                <td>
                  <button
                    onClick={ this.deleteExpense }
                    data-testid="delete-btn"
                  >
                    Deletar
                  </button>
                  <button
                    onClick={ this.editExpense }
                    data-testid="edit-btn"
                  >
                    Editar
                  </button>
                </td>
              </tr>
            )) : null }
          </tbody>
        </table>
        { formDisplay ? (
          <form>
            <h3>Edit</h3>
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
              onClick={ this.editExpenseState }
            >
              Editar despesa
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
  formDisplay: state.wallet.formDisplay,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      description: PropTypes.string,
      tag: PropTypes.string,
      value: PropTypes.string,
      method: PropTypes.string,
      exchangeRates: PropTypes.shape({
        name: PropTypes.string,
        ask: PropTypes.string,
      }),
    }),
  ),
}.isRequired;

export default connect(mapStateToProps)(Table);
