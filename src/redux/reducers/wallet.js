// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: '',
  expenses: '',
  total: 0,
  rates: '',
  formDisplay: false,
  wFormDisplay: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EXP':
    return { ...state, expenses: [...state.expenses, action.payload] };
  // case 'UPDATE_TOTAL':
  //   return {
  //     ...state,
  //     total: state.expenses.reduce((acc, curr) => {
  //       const rate = curr.exchangeRates[curr.currency].ask;
  //       return acc + (parseFloat(curr.value) * parseFloat(rate));
  //     }, 0),
  //   };
  case 'DELETE_EXP':
    return { ...state, expenses: action.payload };
  case 'EDIT_EXP':
    return { ...state, expenses: action.payload };
  case 'DISPLAY_EDIT':
    return { ...state, formDisplay: true, wFormDisplay: false };
  case 'DISPLAY_WF':
    return { ...state, formDisplay: false, wFormDisplay: true };
  default:
    return state;
  }
};

export default wallet;
