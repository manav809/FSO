import { useState } from "react";

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleSubmit = (event) => {
    addNote(event, newNote);
    setNewNote("")
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
