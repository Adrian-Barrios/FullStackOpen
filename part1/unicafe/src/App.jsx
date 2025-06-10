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

const StaticLine = ({text, value}) => {
  return(
    <p>{text} {value}</p>
  )
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  return(
    <div>
      <StaticLine text={'good'} value={good}/>
      <StaticLine text={'neutral'} value={neutral}/>
      <StaticLine text={'bad'} value={bad}/>
      <StaticLine text={'all'} value={all}/>
      <StaticLine text={'average'} value={all === 0 ? 0 : average.toFixed(2)}/>
      <StaticLine text={'positive'} value={all === 0 ? 0 : (good / all * 100).toFixed(1) + ' %'}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    const newAll = all + 1
    setAll(newAll)
    const newAverage = (newGood - bad) / newAll
    setAverage(newAverage)
    const newPositive = (newGood / newAll) * 100
    setPositive(newPositive)
  }
  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    const newAll = all + 1
    setAll(newAll)
    const newAverage = (good - bad) / newAll
    setAverage(newAverage)
    const newPositive = (good / newAll) * 100
    setPositive(newPositive)
  }
  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    const newAll = all + 1
    setAll(newAll)
    const newAverage = (good - newBad) / newAll
    setAverage(newAverage)
    const newPositive = (good / newAll) * 100
    setPositive(newPositive)
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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} postive={positive}/>
    </div>
  )
}

export default App