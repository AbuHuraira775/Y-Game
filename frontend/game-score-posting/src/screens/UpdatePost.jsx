import React, { useState } from 'react'
import InpComp from '../compopnents/InpComp'
import BtnCom from '../compopnents/BtnComp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import PopUp from '../compopnents/PopUp'

function UpdatePost({ post_id, onClose, value, edit }) {
  const navigate = useNavigate()
  const [number, setScore] = useState(value)
  const [isEdit, setIsEdit] = useState(edit)
  const [btnStatus, setBtnStatus] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [updateErrorMessage, setUpdateErrorMessage] = useState(false)

  const [popUp, setPopUp] = useState(true)
  // const [loading, setLoading] = useState(value)

  console.log('Posr score from update component', number)
  // const navigate = useNavigate()


  const fetchPost = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/')
      const data = await response.json()
      // setPost(data.data)
      // setLoading(false)
      console.log('posts:', data)
    }
    catch (err) {
      setUpdateErrorMessage(err)
      console.log('error', err)
    }
  }


  const onEdit = async (id, score) => {
    setBtnStatus(true)
    setUpdateErrorMessage('')
    // setConfirm(true)
    // setIsEdit(false)
    let email = localStorage.getItem('email')
    let date = new Date().toLocaleString()
    let data = JSON.stringify({ email, number, date });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/api/admin/update-post/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    try {

      await axios.request(config)
        .then((res) => {
          if (res.status === 200) {
            navigate('/')
          }
          else {
            setUpdateErrorMessage('why')
          }
        })
        .catch((err) => {
          if (err.status === 400 || err.status === 401 || err.status === 402 || err.status === 403) {
            setUpdateErrorMessage(err.response.data.msg)
          }
          if (!err) {
            setUpdateErrorMessage('why')
          }
          // console.log(`update catch ${err}`)
          if (err.message) {
            setUpdateErrorMessage(err.response.data.msg);
          }
          else {
            setUpdateErrorMessage('Network Error')
          }
        });
    }
    catch (err) {

      if (err.message) {
        // setIsEdit(false)
        setUpdateErrorMessage(err.response.data.msg);
      }
      console.log('error', err)
    }
    finally {
      fetchPost()
      setIsEdit(false)
      setBtnStatus(false)
      setIsEdit(false)
      navigate('/')
    }
  }
  return (
    isEdit ? (
      <div className='w-full h-screen  fixed top-0  m-0 flex items-center justify-center'>
        <div className="bg-cyan-700 h-max w-max p-5 rounded-2xl "> 
          <div className="font-medium m-3">
          <h3 className='text-md font-normal mb-3 text-white'>You can change your game score. That will be visible to all</h3>
          </div>
          <div className='flex items-center justify-between w-full mt-5'>
          <InpComp
              type="number"
              value={number}
              onChange={(score) => setScore(score)}
               // Ensure the correct event target is used
            />
          </div>
          <div className="error">
            <div className="errorMessage">
              {!btnStatus ? <p className='error text-sm text-red-700 text-left mb-3'>{updateErrorMessage} </p> : null}
            </div>
          </div>
          <div className='flex items-center justify-between'>

          <div className="field">
          <BtnCom text='Cancel' onClick={onClose} varient='outlined' color='error' className="bg-white px-5 py-1 border border-slate-500 rounded-md hover:bg-gray-200 font-semibold" />
          </div>
          <div className="field">
            <BtnCom text="Update" onClick={() => onEdit(post_id, number)} varient='contained' isAble={btnStatus ? btnStatus : btnStatus} className='text-white bg-blue-500 px-5 py-1 border-none rounded-md hover:bg-blue-500 font-semibold" '/>
          </div>
          </div>
        </div>
      </div>
    ) : (
      null
    )
  );
}

export default UpdatePost