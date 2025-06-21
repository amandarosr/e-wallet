// Coloque aqui suas actions
export const inputChange = (key, value) => ({
  type: 'INPUT_CHANGE',
  payload: {
    key,
    value,
  },
});

export const expensesAction = (info) => ({
  type: 'SAVE_EXP',
  payload: info,
});

// const currenciesAction = (info) => ({
//   type: 'FETCH_CURR',
//   payload: info,
// });

// const ratesAction = (rates) => ({
//   type: 'FETCH_RATES',
//   payload: rates,
// });

// export const totalAction = () => ({
//   type: 'UPDATE_TOTAL',
// });

export const deleteAction = (exp) => ({
  type: 'DELETE_EXP',
  payload: exp,
});

export const updateIdsAction = () => ({
  type: 'UPDATE_IDS',
});

export const editExpAction = (info) => ({
  type: 'EDIT_EXP',
  payload: info,
});

export const displayEFormAction = () => ({
  type: 'DISPLAY_EDIT',
});

export const displayDFormAction = () => ({
  type: 'DISPLAY_WF',
});

// export const fetchCurr = () => (dispatch) => {
//   fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => response.json())
//     .then((data) => {
//       delete data.USDT;
//       dispatch(currenciesAction(Object.keys(data)));
//     });
// };

// export const fetchRates = () => async (dispatch) => {
//   const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//   const data = await response.json();
//   delete data.USDT;
//   dispatch(ratesAction(data));
// };
