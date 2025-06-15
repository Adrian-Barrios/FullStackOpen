import { useState, useEffect } from 'react'
import countryService from './services/countryService.js'

const App = () => {

  useEffect(() => {
    countryService.getAll().then(response => {
      console.log('Countries fetched:', response)
    }).catch(error => {
      console.error('Error fetching countries:', error)
    })
  },[])

  return (
    <div>
      <h1>Data for Countries</h1>
      <p>This is a placeholder for the Data for Countries application.</p>
      <p>More features will be added soon!</p>
    </div>
  )
}

export default App