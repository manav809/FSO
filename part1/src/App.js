import Header from './components/Header'
import { useState } from 'react'
import StatisticLine from './components/StatisticLine'
import Button from './components/Button'
const Statistics = ({good, bad, neutral}) => {
  if(good + bad + neutral === 0){
    return (
      <>
        <Header text={'statistics'} />
        <h3>no feedback</h3>
      </>
    )
  }
  return (
    <>
      <Header text={'statistics'} />
      <table>
        <tbody>
          <tr><StatisticLine text={"good"} value={good} /></tr>
          <tr><StatisticLine text={"neutral"} value={neutral} /></tr>
          <tr><StatisticLine text={"bad"} value={bad} /></tr>
          <tr><StatisticLine text={"all"} value={good + bad + neutral} /></tr>
          <tr><StatisticLine text={"average"} value={(good + bad + neutral)/3} /></tr>
          <tr><StatisticLine text={"positive"} value={(good/(good + bad + neutral)) * 100} /></tr>       
        </tbody>
      </table>

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
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App