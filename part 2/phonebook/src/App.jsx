import { useState, useEffect } from 'react'
import Form from './components/Form.jsx'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import axios from 'axios'
import { use } from 'react'

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
    const newPersons = persons.concat(nameObject)
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
    console.log('Added:', nameObject)
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

      <Persons persons={filteredPersons}/>
    </div>
  )
  
}

export default App