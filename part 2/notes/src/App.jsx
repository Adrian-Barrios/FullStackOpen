import {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(note => note.id === id ? response.data : note))
      })
  }

    const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const handleNewNote = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important===true)

  const handleFilterChange = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form>
        <input value={newNote} onChange={handleNewNote}/>
        <button type="submit" onClick={addNote}>Save Note</button>
      </form>
      <button onClick={handleFilterChange}>
        Show {showAll ? 'important' : 'all'}</button>
    </div>
  )
}

export default App