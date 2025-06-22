// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: '',
  formDisplay: false,
  wFormDisplay: true,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_EXP':
    return { ...state, expenses: [...state.expenses, action.payload] };
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
