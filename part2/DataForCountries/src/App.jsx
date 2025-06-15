import React, {useState, useEffect} from 'react'
import countryService from './services/countryService.js'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(response => {
        console.log(response)
      })
  }, [])

  return (
    <div>Something</div>
  )
}

export default App
