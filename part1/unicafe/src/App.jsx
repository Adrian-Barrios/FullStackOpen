import { useState } from 'react'

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({onClick, text}) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const Display = ({ good, neutral, bad }) => {
  return(
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
  }
  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
  }
  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
  }

  return (
    <div>
      <Header text={'give feedback'}/>
      <div style={{ display: 'flex', gap: '5px' }}>
      <Button onClick={handleGood} text={'good'}/>
      <Button onClick={handleNeutral} text={'neutral'}/>
      <Button onClick={handleBad} text={'bad'}/>
      </div>
      <Header text={'statistics'}/>
      <Display good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App