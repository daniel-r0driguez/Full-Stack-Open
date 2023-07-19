import { useState , useEffect } from 'react';
import noteService from './services/note';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  };

  useEffect(hook, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  };

  const toggleImportanceOf = (id) => {
    // Finding the note object inside the notes array.
    const note = notes.find(_note => _note.id === id);

    // Making a copy of the note object and flipping its importance.
    const changeNote = {...note, important: !note.important};

    noteService
    .update(id, changeNote)
    .then(returnedNote => {
      setNotes(notes.map(_note => (_note.id !== id) ? _note : returnedNote));
    })
    .catch(error => {
      setErrorMessage(`Note "${note.content}" was already removed from server`);

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      setNotes(notes.filter(_note => _note.id !== id));
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // Use of ternary operator in order to show all notes or only the important notes.
  const notesToShow = (showAll) ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {(showAll) ? 'Important' : 'All'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) =>
        <Note
          key={note.id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote}
        onChange={handleNoteChange}/>
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}
export default App;