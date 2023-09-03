export const setItems = (state, action) => {
  let newState = {...state};
  action.payload.forEach(item => {
    newState[item.element] = item.data;
  });
  state = newState;
  return newState;
};

export const appendItems = (state, action) => {
  let newState = {...state};
  action.payload.forEach(item => {
    newState[item.element] = [
      ...newState[item.element],
      ...action.payload.data,
    ];
  });
  state = newState;
};
export const setItemsToFilter = (state, action) => {
  action.payload.forEach(item => {
    state.filter[item.element] = item.data;
  });
};
export default {setItems, setItemsToFilter, appendItems};
