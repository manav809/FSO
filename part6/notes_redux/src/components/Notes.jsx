import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, id }) => {
  const dispatch = useDispatch();

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <li onClick={() => toggleImportance(id)}>
      {note.content}{" "}
      <strong>{note.important ? "important" : "not important"}</strong>{" "}
    </li>
  );
};

const Notes = () => {
  const notes = useSelector(({filter, notes}) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);

  });

  return (
    <ul>
      {notes.map((note) => (
        <Note note={note} key={note.id} id={note.id} />
      ))}
    </ul>
  );
};

export default Notes;
