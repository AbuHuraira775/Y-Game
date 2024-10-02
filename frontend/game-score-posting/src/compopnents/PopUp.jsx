import React from 'react'
import BtnCom from './BtnComp'

function PopUp({post_id, score, onClose,onClick}) {
  return (
    <div className='box popUpBox'>
        <div className="popUpContent">
            <h1>{score}</h1>
            <p>{post_id}</p>
            <BtnCom text='OK' varient='outlined' onClose={onClose} onClick={onClick}/>
        </div>
    </div>
  )
}

export default PopUp