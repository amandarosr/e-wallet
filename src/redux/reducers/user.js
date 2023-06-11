// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'INPUT_CHANGE':
    return { ...state, [action.payload.key]: action.payload.value };
  default:
    return state;
  }
};

export default user;
