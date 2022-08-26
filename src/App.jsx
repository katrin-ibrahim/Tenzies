import { useState } from 'react'
import './App.css'
import Die from './Die'

function App() {

  const [dice,setDice] = useState(allNewDice()) 

  function allNewDice(){
    return Array.from({length: 10}, () => Math.ceil(Math.random() * 6));
  
  }

  const diceElements = dice.map(die => <Die value={die}/> )
  

 
  return (
   
      <main>
        <div className='die-container'>
          {diceElements}
        </div>
      </main>
  
  )
}

export default App
