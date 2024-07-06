import  {createNote, toggleImportanceOf} from "./reducers/actions";
import { useSelector, useDispatch } from "react-redux";
import NewNote from "./components/newNote";

const App = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <NewNote />
      <ul>
        {notes.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important"}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default App;
