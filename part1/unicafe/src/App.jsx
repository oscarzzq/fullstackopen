import { useState } from 'react'

const Button = ({text, func}) => {
  return (
    <button onClick={func}>{text}</button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    return (
      <table>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={good+neutral+bad} />
        <StatisticsLine text="average" value={(good - bad) / (good + neutral + bad)} />
        <StatisticsLine text="positive" value={good / (good + bad + neutral) * 100 + "%"} />
      </table>
    )
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text="good" func={() => setGood(good + 1)} />
        <Button text="neutral" func={() => setNeutral(neutral + 1)} />
        <Button text="bad" func={() => setBad(bad + 1)} />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App