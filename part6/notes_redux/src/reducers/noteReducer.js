const initialState = [
  {
    content: "reducer defines how redux store works",
    important: true,
    id: 1,
  },
  {
    content: "state of store can contain any data",
    important: false,
    id: 2,
  },
];

const noteReducer = (state = initialState, action) => {
  if (action.type === "NEW_NOTE") {
    return [...state, action.payload];
  } else if (action.type === "TOGGLE_IMPORTANCE") {
    const id = action.payload.id;
    const noteToChange = state.find((n) => n.id === id);
    const changedNote = {
      ...noteToChange,
      important: !noteToChange.important,
    };

    return state.map((note) => (note.id != id ? note : changedNote));
  }
  return state;
};

export default noteReducer;
