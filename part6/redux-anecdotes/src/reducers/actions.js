const getId = () => (100000 * Math.random()).toFixed(0);

export const voteFor = (id) => {
  return {
    type: "VOTE",
    payload: { id },
  };
};

export const createAnecdote = (content) => {
  return {
    type: "ADD_ANECDOTE",
    payload: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export const filterChange = filter => {
  return {
    type: "SET_FILTER",
    payload: filter
  }
}