import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook.js'
import './index.css'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with:
      <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleAddEntry, handleNameChange, handleNumberChange }) => { 
  return (
    <form onSubmit={handleAddEntry}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Alert = ({ message }) => {
  if (!message) {
    return null
  } else {
    return (
      <div className="popup">
        {message}
      </div>
    )
  }}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arturo Hellas',
      number: '040-123456',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [alertMessage, setAlertMessage] = useState(null)

  const Persons = ({ persons, filter }) => {
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )
  
    return (
      <ul>
        {filteredPersons.map(person => (
          <li key={person.name}>{person.name} {person.number} {  <button onClick={() => deleteButton(person.id, persons, setPersons)}>delete</button>}</li> 
        ))}
  
      </ul>
    )
  }

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
      })
  }, [])

  const handleAddEntry = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    } else if (newName === '' || newNumber === '') {
      alert('Name and number cannot be empty')
      return
    }
      setPersons([...persons, { name: newName, number: newNumber }])
      phonebookService.create({ name: newName, number: newNumber })
        .then(response => {
          setAlertMessage(`Added ${response.name}`)
          setTimeout(() => {
            setAlertMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.error('Error adding person:', error)
        })
      setNewName('')
      setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deleteButton = (id, persons, setPersons) => {
    const confirmDelete = confirm(`Delete ${persons.find(person => person.id === id).name}?`);
    if (confirmDelete) {
      phonebookService
        .eliminate(id)
        .then(() => {
          console.log(`Deleted person with id ${id}`);
          const newPersons = persons.filter(person => person.id !== id)
          setPersons(newPersons);
        })
        .catch(error => {
          console.error('Error deleting person:', error)
        })

    }

  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Alert message={alertMessage}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a New</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleAddEntry={handleAddEntry} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App