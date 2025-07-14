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

const Statistics = ({good, neutral, bad, all, average}) => {
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>all: {all}</p>
      <p>Average: {average.toFixed(2)}</p>
      <p>Positive:{all==0 ? 0:  (good/all).toFixed(2)}%</p>
      </div>
  )
}
 
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1
    setAll(all + 1)
    setGood(newGood)
    const newAverage = (newGood - bad) / (all + 1)
    setAverage(newAverage)
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    setAll(all + 1)
    setNeutral(newNeutral)
    const newAverage = (good - bad) / (all + 1)
    setAverage(newAverage)
  }
  const handleBadClick = () => {
    const newBad = bad + 1
    setAll(all + 1)
    setBad(newBad)
    const newAverage = (good - newBad) / (all + 1)
    setAverage(newAverage)
  }

  return (
    <div>
      <Header header="give feedback" />
      <Button text="good" onclick={handleGoodClick} />
      <Button text="neutral" onclick={handleNeutralClick} />
      <Button text="bad" onclick={handleBadClick} />
      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}/>
    </div>
  )
}

export default App
