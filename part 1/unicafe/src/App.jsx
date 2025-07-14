import { useState } from 'react'

const Header = (props) => {
  return(
    <h1>{props.header}</h1>
  )
}

const Button = ({text, onclick}) => {
  return(
    <button onClick={onclick}>{text}</button>
  )
}

const Display = ({good, neutral, bad}) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      </div>
  )
}
 
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header header="give feedback" />
      <Button text="good" onclick={handleGoodClick} />
      <Button text="neutral" onclick={handleNeutralClick} />
      <Button text="bad" onclick={handleBadClick} />
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
