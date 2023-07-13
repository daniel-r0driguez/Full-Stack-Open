import {useState} from 'react';

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
};

const VoteCountLine = ({voteCount}) => {
  return (
    <p>This anecdote has {voteCount} votes.</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Int32Array(anecdotes.length));
  const [mostVotes, setMostVotes] = useState({maxVote:0, anecdoteIndex:0});

  const headerText = 'Anecdote of the day!';

  const randomClick = () => {
    const randomNum = (Math.floor(Math.random() * 100)) % anecdotes.length;
    console.log('Random index is: ' + randomNum);
    setSelected(randomNum);
  }

  const voteClick = () => {
    const copyVotes = {...votes};
    const copyMostVotes = {...mostVotes};

    copyVotes[selected]++;
    console.log('Comparing a vote count of: ' + copyVotes[selected] + ' to ' + mostVotes.maxVote);
    if (copyVotes[selected] > copyMostVotes.maxVote)
    {
      copyMostVotes.maxVote = copyVotes[selected];
      copyMostVotes.anecdoteIndex = selected;
      setMostVotes(copyMostVotes);
      console.log('Anecdote index is now: ' + copyMostVotes.anecdoteIndex);
    }
    setVotes(copyVotes);
  }

  return (
    <div>
      <Header text={headerText}/>
      {anecdotes[selected]}
      <br/>
      <VoteCountLine voteCount={votes[selected]}/>
      <Button text='Vote' handleClick={voteClick}/>
      <Button text='Next Anecdote' handleClick={randomClick}/>
      <br/>
      <Header text='Anecdote with most votes'/>
      {anecdotes[mostVotes.anecdoteIndex]}
    </div>
  )
};

export default App;