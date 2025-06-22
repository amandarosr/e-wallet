import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteAction,
  editExpAction,
  displayDFormAction,
  displayEFormAction,
} from "../redux/actions";
import "./Table.css";
import plus from "../images/plus.png";

class Table extends Component {
  state = {
    valor: "",
    descricao: "",
    metodo: "",
    tag: "",
    editId: "",
  };

  deleteExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const rowId = target.parentNode.parentNode.id;
    const newExp = expenses.filter((e) => e.id !== parseFloat(rowId));
    dispatch(deleteAction(newExp));
  };

  editExpense = ({ target }) => {
    const targetId = target.parentNode.parentNode.id;
    const { expenses, dispatch } = this.props;
    this.setState({
      editId: targetId,
      metodo: expenses[parseFloat(targetId)].method,
      tag: expenses[parseFloat(targetId)].tag,
      // descricao: expenses[parseFloat(targetId)].description,
      valor: expenses[parseFloat(targetId)].value,
    });
    dispatch(displayEFormAction());
  };

  editExpenseState = () => {
    const { dispatch, expenses } = this.props;
    const { valor, descricao, metodo, tag, editId } = this.state;
    const real = parseFloat(editId);
    const editedExp = {
      id: expenses[real].id,
      method: metodo,
      tag,
      value: valor,
      description: descricao,
    };
    const newExp = expenses.map((e) => (e.id === real ? editedExp : e));
    dispatch(editExpAction(newExp));
    dispatch(displayDFormAction());
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { expenses, formDisplay } = this.props;        
    const { valor, descricao, metodo, tag } = this.state;

    return (
      <div>
        <h3 className="table-title">despesas</h3>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr className="head-row">
                <th>descrição</th>
                <th>valor</th>
                <th>tag</th>
                <th>método de pagamento</th>
                <th>editar/excluir</th>
              </tr>
            </thead>
            <tbody>
              {expenses
                ? expenses.map((e) => (
                    <tr key={e.id} id={e.id}>
                      <td>{e.description}</td>
                      <td>R${parseFloat(e.value).toFixed(2)}</td>
                      <td>{e.tag}</td>
                      <td>{e.method}</td>
                      <td>
                        <button
                          onClick={this.editExpense}
                          data-testid="edit-btn"
                          className="edit-btn"
                        >
                          editar
                        </button>
                        <button
                          onClick={this.deleteExpense}
                          className="delete-btn"
                          data-testid="delete-btn"
                        >
                          <img src={plus} alt="x-sign" />
                        </button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        {formDisplay ? (
          <form>
            <h3>editar despesa</h3>
            <input
              type="text"
              data-testid="description-input"
              placeholder="Descrição da despesa"
              name="descricao"
              value={descricao}
              onChange={this.handleChange}
            />
            <input
              type="text"
              data-testid="value-input"
              placeholder="Valor da despesa"
              name="valor"
              value={valor}
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
            <button type="button" onClick={this.editExpenseState}>
              editar despesa
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
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
    })
  ),
}.isRequired;

export default connect(mapStateToProps)(Table);
