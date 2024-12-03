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
  const [success, setSuccess] = useState(false)

  const url = `http://localhost:5000/api/user/contact`
  const headers = { "Content-Type": "application/json" };

  const submitForm = async (email, name, message) => {
    setBtnStatus(true)
    setSuccess('')
    setErrorMessage('')
    const data = { email, name, message }
    console.log(data)
    try {
      await axios.post(url, data, { headers: headers })
        .then((res) => {
          console.log(`success`, res)
          if (res.status === 200) {
            setSuccess(res.data.message)
            setEmail('')
            setName('')
            setMessage('')
            // setErrorMessage(res.data.message)
          }
          if (!res) {
            setErrorMessage('Network error. Please check your internet connection.');
          }
        })
        .catch((err) => {
          if (err.status === 400 || err.status === 401) {
            setErrorMessage(err.response.data.msg)
          }
          else {
            setErrorMessage('Network error. Please check your internet connection.');
          }
          console.log('failed', err)
        })

    }
    catch (err) {
      if (err) {
        console.log('catch err', err)
        setErrorMessage('catch Network error. Please check your internet connection.');
      }
    }
    finally {
      setBtnStatus(false)
    }

  }
  return (
    <Container maxWidth='sm bg-white  w-full h-screen flex flex-col items-center justify-center'>

      <div className='w-full box contactBox bg-slate-100 border-2 border-cyan-500 w-max h-max self-center m-auto p-5 rounded-xl flex flex-col items-center '>

        <div className="heading m-5">
          <h1 className='text-3xl auto font-bold '>Get in Touch!</h1>
        </div>
        <div className="field w-full">
          <InpComp type="email" placeholder="Email Address" name="email" value={email} onChange={(val) => setEmail(val)} />
        </div>
        <div className="field w-full">
          <InpComp type="text" placeholder="Your Name" name="name" value={name} onChange={(val) => setName(val)} />
        </div>

        <div className=" w-full">
          <InpComp type="text" placeholder="Message" name="message" value={message} onChange={(val) => setMessage(val)} />
        </div>

        <div className="errorMessage w-70">
          {popUp ? null : <p className='error text-sm text-red-700 text-left mb-3'>{errorMessage}</p>}
        </div>

        <div className="successMessage">
          {popUp ? null : <p className='text-sm text-green-700 text-left mb-3'>{success}</p>}
        </div>
        <div className="w-full ">
          <BtnCom text={btnStatus ? "PLEASE WAIT..." : "SUBMIT"} onClick={() => submitForm(email, name, message)} varient='contained' isAble={btnStatus ? btnStatus : btnStatus}  className='w-full text-white  px-5 py-1 border-2 bg-cyan-600 rounded-md hover:bg-cyan-700 font-semibold mb-2'/>
        </div>
      </div>
    </Container>
  )
}

export default Contact