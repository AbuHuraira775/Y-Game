import React, { useState } from 'react'
import BtnCom from '../compopnents/BtnComp'

function DeletePost({ post_id, deleteWithId, onClose, score }) {
  const [btnStatus, setBtnStatus] = useState(false)

  return (
    <div className="box deleteBox ">

      <div className="heading">

        <h3>Are you sure you want to delete this post?</h3>
        {/* <p>Post ID: {post_id}</p> */}
        <p>Score: {score}</p>
      </div>
      <div className="field">
        <BtnCom text='Cancel' onClick={onClose} varient='outlined' color='error' />
      </div>
      <div className="field">
        <BtnCom text='Confirm' onClick={deleteWithId} varient='contained' color='error' isAble={btnStatus ? btnStatus : btnStatus} />
      </div>
    </div>
  )
}

export default DeletePost