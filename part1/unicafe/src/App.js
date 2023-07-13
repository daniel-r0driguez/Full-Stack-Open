import { useState } from 'react';

const Header = ({headerText}) => <h1>{headerText}</h1>;

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>;

const StatisticLine = ({text, value}) => <p>{text} {value}</p>;

const Statistics = ({goodClicks, neutralClicks, badClicks}) => {
  const total = goodClicks + neutralClicks + badClicks;

  if (total <= 0)
  {
    return (
      <h3>No feedback given!</h3>
    )
  }

  const average = (goodClicks - badClicks) / total;
  const positivePercentage = goodClicks / total;

  return (
    <>
      <h2>Statistics</h2>
      <StatisticLine text='Good:' value={goodClicks}/>
      <StatisticLine text='Neutral:' value={neutralClicks}/>
      <StatisticLine text='Bad:' value={badClicks}/>
      <StatisticLine text='All:' value={total}/>
      <StatisticLine text='Average:' value={average}/>
      <StatisticLine text='Positive:' value={positivePercentage}/>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const headerText = 'Give feedback';

  const handleGoodClick = () => {
    console.log('Changing good to ' + (good + 1));
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    console.log('Changing neutral to ' + (neutral + 1));
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    console.log('Changing bad to ' + (bad + 1));
    setBad(bad + 1);
  }

  return (
    <div>
      <Header headerText={headerText}/>
      <Button text='Good' handleClick={handleGoodClick}/>
      <Button text='Neutral' handleClick={handleNeutralClick}/>
      <Button text='Bad' handleClick={handleBadClick}/>
      <Statistics goodClicks={good} neutralClicks={neutral} badClicks={bad}/>
    </div>
  )
}
export default App;
