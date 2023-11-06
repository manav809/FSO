import Header from './components/Header'
import { useState } from 'react'

const Statistics = ({good, bad, neutral}) => {
  return (
    <>
      <Header text={'statistics'} />
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + bad + neutral}</p>
      <p>average {(good + bad + neutral)/3}</p>
      <p>positive {(good/(good + bad + neutral)) * 100} %</p>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={"give feedback"} />
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App