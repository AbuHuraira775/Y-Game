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
            setIsEdit(false)

            navigate('/handle')
          }
          else{
            setUpdateErrorMessage('why')
          }
        })
        .catch((err) => {
          if (err.status === 400 || err.status === 401 || err.status === 402 || err.status === 403) {
            console.log('o',err)
            setUpdateErrorMessage(err.response.data.msg)
          }
          if(!err){

            setUpdateErrorMessage('why')
          }
          // console.log(`update catch ${err}`)
          if (err.message) {
            // setIsEdit(false)
            setUpdateErrorMessage(err.response.data.msg);
          }
          else{
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
      setBtnStatus(false)
    }
  }
  return (
    isEdit ? (
      <div className='box editBox' >

        <div className="field">

          <InpComp
            type="number"
            value={number}
            onChange={(score) => setScore(score)} // Ensure the correct event target is used
          />
        </div>

        <div className="error">
          <div className="errorMessage">
            {!btnStatus ? <p className='error'>{updateErrorMessage} </p> : null}
          </div>
        </div>
        <div className="field">

          <BtnCom onClick={onClose} text="Cancel" varient='outlined' isAble={btnStatus ? btnStatus : btnStatus} />

        </div>
        <div className="field">

          <BtnCom text="Update" onClick={() => onEdit(post_id, number)} varient='contained' isAble={btnStatus ? btnStatus : btnStatus} />
        </div>

        {/* {
          confirm ? <PopUp post_id={post_id} onClose={onClose} score={number}/>: null
        } */}
      </div>


    ) : (
      null
    )
  );
}

export default UpdatePost