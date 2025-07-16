import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    // Fetch all countries only once, or you can fetch based on filter if your API supports it
    countriesService
      .getAll()
      .then(data => {
        setCountries(data)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
        setCountries([])
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      <h1>Countries</h1>
      <p>find countries <input value={filter} onChange={handleFilterChange} /></p>
      <div>
        {filteredCountries.length === 0 ? (
          <p>No countries found</p>
        ) : (
          filteredCountries.map(country => (
            <div key={country.cca2}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital ? country.capital.join(', ') : 'N/A'}</p>
              <p>Population: {country.population}</p>
              <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default App