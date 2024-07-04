import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";
import  {createNote, toggleImportanceOf} from "./reducers/actions";

const store = createStore(noteReducer);

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content:
      "If there is a change in the state, the old object is not changed, but it is replaced with a new, changed, object.",
    important: true,
    id: 1,
  },
});

store.dispatch({
  type: "NEW_NOTE",
  payload: {
    content:
      "The general convention is that actions have exactly two fields, type telling the type and payload containing the data included with the Action.",
    important: false,
    id: 2,
  },
});

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";

    store.dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    store.dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>

      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important"}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();

store.subscribe(() => {
  renderApp();
  console.log(store.getState());
});
