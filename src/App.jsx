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

  const handleClick = () => {
    setFlip(!flip);
  };

  return (
    <div className="card" onClick={handleClick}>
      {flip ? props.answer:props.question}
    </div>
  );
}

const App = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const nextCard = () => {
    const randomCard = Math.floor(Math.random() * cards.length);
    setCurrentCard(randomCard);
  };

  return (
    <div className="app">
      <h1>Adventure Time Trivia</h1>
      <h2>Are you part of the Candy Kingdom?</h2>
      <p>Number of cards: {cards.length}</p>

      <div className="flashcard-container">
        <FlashCard
          question={cards[currentCard].question}
          answer={cards[currentCard].answer}
        />
      </div>

      <button onClick={nextCard}>Next</button>
    </div>
  );
};

export default App;
