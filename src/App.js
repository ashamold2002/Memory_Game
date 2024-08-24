import { Button, Container } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import SingleCard from "./SingleCard";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
const CardImages = [
  { src: "Images/21.jfif", matched: false },
  { src: "Images/32.jpg", matched: false },

  { src: "Images/23.jfif", matched: false },

  { src: "Images/24.jfif", matched: false },

  { src: "Images/28.jfif", matched: false },
  { src: "Images/25.jfif", matched: false },

  { src: "Images/26.jfif", matched: false },

  { src: "Images/27.jfif", matched: false },
];
function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);
  const [newstart,setNew]=useState(true);
  const [count,setCount]=useState(0);
  const [gridclose,setClose]=useState(false);
  const { width, height } = useWindowSize()
  // console.log("count",count);

  const ShuffleCard = () => {
    setNew(false);
    setClose(false);
    setCount(0);
    const ShuffledCards = [...CardImages, ...CardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(ShuffledCards);
    setTurn(0);
    
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurns) => prevTurns + 1);
    setDisable(false);
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisable(true);
      
      if (choiceOne.src == choiceTwo.src) {
        setCards((precard) => {
          return precard.map((card) => {
            if (card.src === choiceOne.src) {
              // setCount((ct)=>ct+1)
              return { ...card, matched: true };
              
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      setClose(true);
    }
  }, [cards]);

  return (
    <>
    
      <div className="App">
        <h1>Memory Game</h1>
        {newstart ? <Button variant="outlined" color="success" className="btn" onClick={ShuffleCard}>
          Start
        </Button> : <Button variant="outlined" color="success" className="btn" onClick={ShuffleCard}>
          Restart
        </Button> }
        {/* <p style={{marginTop:10}}>Turns: {turn}</p> */}
        
        {!gridclose ? <div className="grid">
          {cards.map((card) => (
            // <Row key={card.id}>
            //   <Col>
            //   <img className='front' src={card.src}/>
            //   <img className='back' src='Images/cover.jpg'/>
            //   </Col>
            // </Row>
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disable={disable} 
            />
          ))}
        </div> :
        <Container className="cong"> <div style={{marginTop:50}}>
        <Confetti
      width={width}
      height={height}
    />
          <h3>Congratulation You Won</h3>
          <p>Turns: {turn}</p>
        </div> </Container>}
        
        
       
      </div>
    </>
  );
}

export default App;
