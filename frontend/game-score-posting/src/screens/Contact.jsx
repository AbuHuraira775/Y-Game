import React, { useState } from 'react'
import InpComp from '../compopnents/InpComp'
import BtnCom from '../compopnents/BtnComp'
import axios from 'axios';
import { Container } from '@mui/material';

function Contact() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [btnStatus, setBtnStatus] = useState(false)

  const url = `http://localhost:5000/api/user/contact`
  const headers = { "Content-Type": "application/json" };

  const submitForm = async (email, name, message) => {
    setBtnStatus(true)
    setErrorMessage('')
    const data = { email, name, message }
    console.log(data)
    try {
      await axios.post(url, data, { headers: headers })
        .then((res) => {
          console.log(`success`, res)
          if (res.status === 200) {
            setEmail('')
            setName('')
            setMessage('')
            // setErrorMessage(res.data.message)
          }
          if(!res){
            setErrorMessage('Network error. Please check your internet connection.');
          }
        })
        .catch((err) => {
          if (err.status === 400 ||err.status === 401) {
            setErrorMessage(err.response.data.msg)
          }
          else {
            setErrorMessage('Network error. Please check your internet connection.');
          }
          console.log('failed', err)
        })

    }
    catch (err) {
      if(err){
        console.log('catch err',err)
        setErrorMessage('catch Network error. Please check your internet connection.');
      }
    }
    finally {
      setBtnStatus(false)
    }

  }
  return (
    <Container maxWidth='sm'>

      <div className='box contactBox'>

        <div className="heading">
          <h1>Get in Touch!</h1>
        </div>
        <div className="field">
          <InpComp type="email" placeholder="Email Address" name="email" value={email} onChange={(val) => setEmail(val)} />
        </div>
        <div className="field">
          <InpComp type="text" placeholder="Your Name" name="name" value={name} onChange={(val) => setName(val)} />
        </div>

        <div className="field">
          <InpComp type="text" placeholder="Message" name="message" value={message} onChange={(val) => setMessage(val)} />
        </div>

        <div className="errorMessage">
          {popUp ? { message } : <p className='error'>{errorMessage}</p>}
        </div>
        <div className="field">
          <BtnCom text={btnStatus ? "PLEASE WAIT..." : "SUBMIT"} onClick={() => submitForm(email, name, message)} varient='contained' isAble={btnStatus?btnStatus:btnStatus}/>
        </div>
      </div>
    </Container>
  )
}

export default Contact