import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456'
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit" onClick={addEntry}>add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, index) => 
          <li key={index}>{person.name} {person.number}</li>
        )}
      </ul>
      
    </div>
  )
}

export default App