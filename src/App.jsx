import {useState} from 'react';
import './App.css';

const cards = [
  {
    question: "Who is Finn's best friend?",
    answer: "Jake the Dog"
  },
  {
    question: "What kingdom does Princess Bubblegum rule?",
    answer: "The Candy Kingdom"
  },
  {
    question: "What kind of creature is Jake?",
    answer: "A magical dog"
  },
  {
    question: "Who is the Ice King's main companion?",
    answer: "Gunter"
  },
  {
    question: "What instrument does Marceline play?",
    answer: "Bass guitar"
  },
  {
    question: "What is Finn's last name?",
    answer: "Mertens"
  },
  {
    question: "Who is Jake's girlfriend?",
    answer: "Lady Rainicorn"
  },
  {
    question: "What is BMO?",
    answer: "A living video game console"
  },
  {
    question: "Who is Marceline's father?",
    answer: "Hunson Abadeer"
  },
  {
    question: "What land does Adventure Time take place in?",
    answer: "The Land of Ooo"
  }
];

function FlashCard(props) {
  const [flip, setFlip] = useState(false);
  const [guess, setGuess] = useState('');
  const [correct, setCorrect] = useState('');

  const handleClick = () => {
    setFlip(!flip);
  };

  const checkAnswer = () => {
    if (props.answer.toLowerCase().includes(guess.toLowerCase())) {
      setCorrect('Correct!');
      props.updateStreak(true);
    } else {
      setCorrect('Wrong!');
      props.updateStreak(false);
    }
  };
  
  return (
    <div>
      <input
        className={correct === 'Correct!' ? 'correct-input' : correct === 'Wrong!' ? 'wrong-input' : ''}
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />

      <button onClick={checkAnswer}>Submit</button>

      <p>{correct}</p>

      <div className="card" onClick={handleClick}>
        {flip ? props.answer : props.question}
      </div>
      <button onClick={props.masterCard}>
        Mastered
      </button>
    </div>
  );
}

const App = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [availableCards, setAvailableCards] = useState(cards);
  const [masteredCards, setMasteredCards] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const updateStreak = (isCorrect) => {
    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
  
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setCurrentStreak(0);
    }
  };

  const masterCard = () => {
    const card = availableCards[currentCard];
  
    setMasteredCards([...masteredCards, card]);
  
    const newCards = availableCards.filter((_, index) => index !== currentCard);
    setAvailableCards(newCards);
  
    if (currentCard >= newCards.length) {
      setCurrentCard(newCards.length - 1);
    }
  };

  const nextCard = () => {
    setCurrentCard(currentCard + 1);
  };

  const previousCard = () => {
    setCurrentCard(currentCard - 1);
  };

  return (
    <div className="app">
      <h1>Adventure Time Trivia</h1>
      <h2>Are you part of the Candy Kingdom?</h2>
      <h3>Number of cards: {cards.length}</h3>

      <div className="flashcard-container">
        <FlashCard
          key={availableCards[currentCard].question}
          question={availableCards[currentCard].question}
          answer={availableCards[currentCard].answer}
          updateStreak={updateStreak}
          masterCard={masterCard}
        />
      </div>

      <p>Current Streak: {currentStreak}</p>
      <p>Longest Streak: {longestStreak}</p>

      <button
        onClick={previousCard}
        disabled={currentCard === 0}
      >
        Back
      </button>

      <button
        onClick={nextCard}
        disabled={currentCard === availableCards.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default App;
