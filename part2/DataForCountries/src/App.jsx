import React, {useState, useEffect} from 'react'
import countryService from './services/countryService.js'


const Display = ({ countries, filterValue }) => {
  if (filterValue === '') {
    return(
      <div>Please look for a country</div>
    )
} 
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filterValue.toLowerCase())
  )
  if (filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (filteredCountries.length === 1){
    const country = filteredCountries[0];
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />
      </div>
    )
  } else if (filteredCountries.length === 0) {
    return (
      <div>No countries found</div>
    )
  } else {
    return (
      <ul>
        {filteredCountries.map((country, index) => (
          <li key={index}>{country.name.common}</li>
        ))}
      </ul>
    )
  }

}

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(response => {
        console.log(response)
        setAllCountries(response)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)}

  return (
    <div>
      filter: <input value={filterValue} onChange={handleFilterChange} />
      <Display countries={allCountries} filterValue={filterValue} />

    </div>
  )
}

export default App
