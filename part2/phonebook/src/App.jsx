import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook.js'

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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arturo Hellas',
      number: '040-123456',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
          console.log('Added:', response)
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
    phonebookService.eliminate(id)
    const newPersons = persons.filter(person => person.id !== id)
    setPersons(newPersons)
  }


  return (
    <div>
      <h1>Phonebook</h1>
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