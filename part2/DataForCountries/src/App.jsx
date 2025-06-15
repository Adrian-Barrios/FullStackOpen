import { useState, useEffect } from 'react'
import countryService from './services/countryService.js'

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService.getAll().then(response => {
      const countries = response // Array of objects
      setCountries(countries)
    }).catch(error => {
      console.error('Error fetching countries:', error)
    })
  },[])
  console.log('Countries:', countries)

  return (
    <div>
      <h1>Data for Countries</h1>
      <p>This is a placeholder for the Data for Countries application.</p>
      <p>More features will be added soon!</p>
    </div>
  )
}

export default App