import {useEffect, useState} from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

import {FaFish} from "react-icons/fa"
import {FaCat} from "react-icons/fa"
import {FaDog} from "react-icons/fa"
import {FaHorse} from "react-icons/fa"
import {FaFrog} from "react-icons/fa"
import {FaSpider} from "react-icons/fa"

const cardImages = [
{icon: <FaFish/>, matched:false},
{icon: <FaCat/>, matched:false},
{icon: <FaDog/>, matched:false},
{icon: <FaHorse/>, matched:false},
{icon: <FaFrog/>, matched:false},
{icon: <FaSpider/>, matched:false}]



function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  /*console.log(cards)*/
  
  //shuffle cards neues Spiel starten
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random() }))
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
   choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(()=> {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.icon === choiceTwo.icon){
      setCards(prevCards => {
        return prevCards.map(card => {
         if(card.icon === choiceOne.icon){
          return{...card, matched: true}
         }else {
          return card
         }
        })
      })  
      resetTurn()
      }else{
      setTimeout(() => resetTurn(),1000)
      }
    }
  }, [choiceOne, choiceTwo])

  


  

  //reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns +1)
    setDisabled(false)
  }

  //start game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  
  
  return (
    <div className="App">
     <h2>memory</h2>
     
      <div className="card-grid">
        {cards.map(card => (
        <SingleCard 
        key={card.id}
        card={card}
        handleChoice = {handleChoice}
        flipped = {card === choiceOne || card === choiceTwo || card.matched}
        disabled = {disabled}
        />
        ))}
      </div>

      <h2>Versuche: {turns}</h2>

      {cards.every((card)=> card.matched)?
      <button onClick={shuffleCards}>weiter spielen?</button> :null}
     
      
    </div>
  );
}

export default App;

