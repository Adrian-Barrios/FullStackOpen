import {useState, useEffect} from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

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

  const handleNewNote = (event) => {
    setNewNote(event.target.value)
  }

  const addNote = event => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
  }
  axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      console.log(response)
    })
    setNewNote('')
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
          <Note key={note.id} note={note} />
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