import React from 'react'

const Form = ({ newName, handleNameChange, newNumber, handleNumberChange, addEntry }) => {
  return (
      <form>
        <div>name: <input value={newName} onChange={handleNameChange} /></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit" onClick={addEntry}>add</button></div>
      </form>
  )
}

export default Form