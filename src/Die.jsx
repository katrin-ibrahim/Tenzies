import React from 'react'

export default function Die(props) {
  return (
    <div className={props.isHeld? 'die held': 'die not-held' } onClick={props.holdDice}>
        <h2>{props.value}</h2>
    </div>
  )
}
