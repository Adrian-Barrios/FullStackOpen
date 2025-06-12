import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arturo Hellas',
      number: '040-123456',
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <p>filter shown with:
        <input value={filter} onChange={handleFilterChange} />
      </p>
      <h2>add a New</h2>
      <form onSubmit={handleAddEntry}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br></br>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default App