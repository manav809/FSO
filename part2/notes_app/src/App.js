import Note from "./components/Note";
import { useState, useEffect } from "react";
import notesService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const toggleImportanceOf = (id) => {
    console.log("importance of " + id + " needs to be toggled");

    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };
    notesService.update(id, changedNote).then((upDatedNote) => {
      setNotes(notes.map((n) => (n.id !== id ? n : upDatedNote)));
    });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  useEffect(() => {
    console.log("effect");
    notesService.getAll().then((initialNotes) => {
      console.log("promise fulfilled");
      setNotes(initialNotes);
    });
  }, []);

  console.log("render", notes.length, "notes");
  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    notesService.create(noteObject).then((createdNote) => {
      setNotes(notes.concat(createdNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

/* Alternative way to define useeffect
const hook = () => {
  console.log('effect')
  axios
    .get('http://localhost:3001/notes')
    .then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
}

useEffect(hook, [])
*/

/* Alternative way to do event handling

useEffect(() => {
  console.log('effect')

  const eventHandler = response => {
    console.log('promise fulfilled')
    setNotes(response.data)
  }

  const promise = axios.get('http://localhost:3001/notes')
  promise.then(eventHandler)
}, [])
*/
