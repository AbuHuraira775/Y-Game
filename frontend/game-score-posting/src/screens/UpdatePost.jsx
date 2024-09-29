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

  const [popUp, setPopUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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
      console.log('error', err)
    }
  }

  const onEdit = async (id, score) => {
    setConfirm(true)
    setIsEdit(false)
    let email = localStorage.getItem('email')
    let data = JSON.stringify({ email, number });

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
            // navigate('/handle')
            
          }
        })
        .catch((err) => {
          if (err.message === 'Network Error') {
            setErrorMessage(err.message);
          }
          else if (err.status === 400 || err.status === 401 || err.status === 402 || err.status === 403) {
            setErrorMessage(err.response.data.msg)
          }
          console.log(err);
        });
    }
    catch (err) {
      if (err.status === 400 || 401 || 402 || 403) {
        setErrorMessage(err.response.data.msg)
      }
      if (!err.respones) {
        setErrorMessage("Network Error. Please check your Internet Connection")
      }
      console.log('error', err)
    }
    finally {
      setBtnStatus(false)
      setIsEdit(false)
      fetchPost()
    }
  }
  return (
    isEdit ? (
      <div className='box editBoc' >

        <div className="field">

          <InpComp
            type="number"
            value={number}
            onChange={(score) => setScore(score)} // Ensure the correct event target is used
          />
        </div>

        <div className="error">
          <div className="errorMessage">
            {popUp ? <p className='error'>{errorMessage} </p> : null}
          </div>
        </div>
        <div className="field">

          <BtnCom text="Update Post" onClick={() => onEdit(post_id, number)} varient='outlined' isAble={btnStatus ? btnStatus : btnStatus} />
        </div>
        <div className="field">

          <BtnCom onClick={onClose} text="Cancel" varient='outlined' isAble={btnStatus ? btnStatus : btnStatus} />

        </div>

        {
          confirm ? <PopUp post_id={post_id} onClose={onClose} score={number}/>: null
        }
      </div>

      
    ) : (
      null
    )
  );
}

export default UpdatePost