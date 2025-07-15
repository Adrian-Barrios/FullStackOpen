import { useState, useEffect } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log('Data fetched from db.json:', response.data)
      })
  }
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    personsService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        console.log('Person added:', returnedPerson)
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error adding person:', error)
        alert(`Error adding person: ${error.response.data.error}`)
      })
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          console.log(`Person with id ${id} deleted`)
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          alert('Error deleting person. It may have already been removed.')
        })
    }
  }

  const filteredPersons = filter ? persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  ) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h1>Add a new</h1>
      <Form 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        addEntry={addEntry}
      />
      <h2>Numbers</h2>

      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
  
}

export default App