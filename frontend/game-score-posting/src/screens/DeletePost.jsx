import React, { useState } from 'react'
import BtnCom from '../compopnents/BtnComp'

function DeletePost({ post_id, deleteWithId, onClose, score }) {
  const [btnStatus, setBtnStatus] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  return (
    <div className=' w-full h-screen  fixed top-0  m-0 flex items-center justify-center z-20'>
        <div className="bg-white h-max w-max p-5 rounded-2xl bg-red-100 border-2 border-red-300"> 

        <div className="font-medium m-3">

          <h3 className='text-md font-normal mb-3'>Are you sure you want to delete this post?</h3>
          <p className='text-md font-normal'>Score: {score}</p>
        </div>



        <div className="errorMessage">
          {popUp ? null : <p className='error text-sm text-red-700 text-left mb-3 text-red-900'>{errorMessage}</p>}
        </div>

        <div className='flex items-center justify-between w-full mt-5'>

          <div className=" w-full ">
            <BtnCom text='Cancel' onClick={onClose} varient='outlined' color='error' className="bg-white px-5 py-1 border border-slate-500 rounded-md hover:bg-gray-200 font-semibold" />
          </div>
          <div >
            <BtnCom text='Confirm' onClick={()=>deleteWithId()} varient='contained' color='error' className="text-white bg-red-600 px-5 py-1 border-none rounded-md hover:bg-red-500 font-semibold"  />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeletePost