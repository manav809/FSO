import Note from "./components/Note";
import { useState, useEffect } from "react";
import notesService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const toggleImportanceOf = (id) => {
    console.log("importance of " + id + " needs to be toggled");

    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };
    notesService
      .update(id, changedNote)
      .then((upDatedNote) => {
        setNotes(notes.map((n) => (n.id !== id ? n : upDatedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      console.log(username, password);
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="text"
          value={password}
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );
  return (
    <div>
      <h1>Notes</h1>
      {errorMessage ? <Notification message={errorMessage} /> : <></>}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>Welcome {user.name}, below are your notes</p>
          {noteForm()}
        </div>
      )}
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
      <Footer />
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
