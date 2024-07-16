const filterReducer = (state = "", action) => {
  if (action.type === "SET_FILTER") {
    return action.payload;
  }
  return state;
};

export default filterReducer;