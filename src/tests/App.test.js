import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import Wallet from '../pages/Wallet';

describe('Testes da página Login', () => {
  const emailTest = 'amanda@gmail.com';
  const emailId = 'email-input';
  const passId = 'password-input';

  test('Testa se inputs e botão renderizam', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailId);
    const passInput = screen.getByTestId(passId);
    const button = screen.getByRole('button');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Testa se botão está desabilitado e é habilitado em certas condições', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailId);
    const passInput = screen.getByTestId(passId);
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();

    userEvent.type(emailInput, emailTest);
    userEvent.type(passInput, '123456');
    expect(button).toBeEnabled();
  });

  test('Testa se ao clicar no botão o estado global é alterado e a página redirecionada', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId(emailId);
    const passInput = screen.getByTestId(passId);
    const button = screen.getByRole('button');

    userEvent.type(emailInput, emailTest);
    userEvent.type(passInput, '123456');
    userEvent.click(button);
    const emailState = store.getState().user.email;

    expect(emailState).toBe(emailTest);
    expect(history.location.pathname).toBe('/carteira');
  });
});

describe('Testes da página Wallet', () => {
  test('Testa se elementos são renderizados', () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInput = screen.getByTestId('value-input');
    const descrInput = screen.getByTestId('description-input');
    const currInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addBtn = screen.getByRole('button');
    const table = screen.getByRole('table');

    expect(valueInput).toBeInTheDocument();
    expect(descrInput).toBeInTheDocument();
    expect(currInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addBtn).toBeInTheDocument();
    expect(table).toBeInTheDocument();
  });
  test('Testa se expense aparece na tabela ao estar no estado global', () => {
    const initialState = { wallet: {
      expenses: [{
        id: 0,
        value: '3',
        description: 'Hot Dog',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {
          USD: {
            code: 'USD',
            name: 'Dólar',
            ask: '5.6208',
          },
          EUR: {
            code: 'EUR',
            name: 'Euro',
            ask: '6.6112',
          },
        },
      }],
      currencies: ['USD', 'EUR'],
      rates: {
        USD: {
          code: 'USD',
          name: 'Dólar Comercial',
          ask: '5.6208',
        },
        EUR: {
          code: 'EUR',
          name: 'Euro',
          ask: '6.6112',
        },
      },
      total: 16.8624,
    },
    };
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries },
    );

    const expense = screen.getByText('Hot Dog');
    const buttons = screen.getAllByRole('button');

    expect(expense).toBeInTheDocument();
    expect(buttons).toHaveLength(2);
  });
  test('Testa se deletar uma expense a tira do estado', () => {
    const initialState = { wallet: {
      expenses: [{
        id: 0,
        value: '3',
        description: 'Hot Dog',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {
          USD: {
            code: 'USD',
            name: 'Dólar',
            ask: '5.6208',
          },
          EUR: {
            code: 'EUR',
            name: 'Euro',
            ask: '6.6112',
          },
        },
      }],
      currencies: ['USD', 'EUR'],
      rates: {
        USD: {
          code: 'USD',
          name: 'Dólar Comercial',
          ask: '5.6208',
        },
        EUR: {
          code: 'EUR',
          name: 'Euro',
          ask: '6.6112',
        },
      },
      total: 16.8624,
    },
    };
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries },
    );

    const expense = screen.getByText('Hot Dog');
    const buttons = screen.getAllByRole('button');
    userEvent.click(buttons[0]);

    expect(expense).not.toBeInTheDocument();
  });
  test('Testa se ao clicar em editar uma expense o WalletForm não aparece', () => {
    const initialState = { wallet: {
      expenses: [{
        id: 0,
        value: '3',
        description: 'Cadarço',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: {
          USD: {
            code: 'USD',
            name: 'Dólar',
            ask: '5.6208',
          },
          EUR: {
            code: 'EUR',
            name: 'Euro',
            ask: '6.6112',
          },
        },
      }],
      currencies: ['USD', 'EUR'],
      rates: {
        USD: {
          code: 'USD',
          name: 'Dólar',
          ask: '5.6208',
        },
        EUR: {
          code: 'EUR',
          name: 'Euro',
          ask: '6.6112',
        },
      },
      total: 16.8624,
    },
    };
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries },
    );

    const editButton = screen.getByText('Editar');
    const deleteButton = screen.getByText('Deletar');

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);
    const deleteButton2 = screen.queryByText('Deletar');

    expect(deleteButton2).not.toBeInTheDocument();
  });
  test('Testa se form de edição aparece ao clicar em "Editar"', () => {
    const initialState = { wallet: {
      expenses: [{
        id: 0,
        value: '3',
        description: 'Cadarço',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Lazer',
        exchangeRates: {
          USD: {
            code: 'USD',
            name: 'Dólar',
            ask: '5.6208',
          },
          EUR: {
            code: 'EUR',
            name: 'Euro',
            ask: '6.6112',
          },
        },
      }],
      currencies: ['USD', 'EUR'],
      rates: {
        USD: {
          code: 'USD',
          name: 'Dólar',
          ask: '5.6208',
        },
        EUR: {
          code: 'EUR',
          name: 'Euro',
          ask: '6.6112',
        },
      },
      total: 16.8624,
    },
    };
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries },
    );

    const editButton = screen.getByText('Editar');
    userEvent.click(editButton);

    const editBtn2 = screen.getByText('Editar despesa');

    expect(editBtn2).toBeInTheDocument();
  });
});
