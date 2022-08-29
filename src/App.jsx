import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import Die from './Die'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"


function App() {

  const [dice,setDice] = useState(allNewDice()) 
  const [tenzies, setTenzies] = useState(false)
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })

  //this was slower
  // useEffect(() => {
  //   console.log(dimensions)
  //   function handleResize() {
  //     setDimensions({
  //       height: window.innerHeight,
  //       width: window.innerWidth
  //     })
    
  // }
  //   window.addEventListener('resize', handleResize)
  // })

  React.useEffect(() => {
    window.addEventListener("resize", function() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    })
}, [])

  useEffect(() =>{
    const heldDice = dice.filter(die => die.isHeld)
    const value = dice[0].value
    const sameValDice = heldDice.filter(die => (die.value === value))
    if(sameValDice.length === 10){
      setTenzies(true)
      console.log("You won!")
    }

  },[dice])

  function generateNewDie(){
      return { 
        value: Math.ceil(Math.random() * 6), 
        isHeld:false,
        id: nanoid()
        }
  }

  function allNewDice(){
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
    }
    return newDice
  
  }
  const diceElements = dice.map(die => (
  <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} /> 
  ))
  
  function rollDice(){
    if(!tenzies){
      setDice(prevDice => prevDice.map(die => {
      return die.isHeld? 
      die:
      generateNewDie()
    }))
  }
    else{
      setTenzies(false)
      setDice(allNewDice())
  }
    
  } 

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
}



 
  return (
  
   
        <main>
        {tenzies &&  <Confetti width={dimensions.width} height={dimensions.height} />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="die-container">
            {diceElements}
          </div>
          <button
           className='roll-dice' onClick={rollDice}>{tenzies?"New Game":"Roll"}
          </button>
        </main>

  
  )
}

export default App
