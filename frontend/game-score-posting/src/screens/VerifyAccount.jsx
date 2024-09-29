import React, { useState } from 'react'
import InpComp from '../compopnents/InpComp'
import BtnCom from '../compopnents/BtnComp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

function VerifyAccount() {
  const [otp, setOTP] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [verified, setVerified] = useState(true)
  const [btnStatus, setBtnStatus] = useState(false)
  const url = `http://localhost:5000/api/admin/verify-account`
  const headers = { "Content-Type": "application/json" }
  const navigate = useNavigate()
  const fetchAdmin = () => {

    const url = "http://localhost:5000/api/admin/get-admin";
    let data = {}

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          data['token'] = res.data.data.token;
          data['id'] = res.data.data._id;
          data['isVerified'] = res.data.data.isVerified;
          data['email'] = res.data.data.email;

          // Store them in localStorage

          localStorage.setItem('user', JSON.stringify({
            token: data.token,
            id: data.id,
            email: data.email,
            isVerified: data.isVerified
          }));

        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
      });
  }
  const verifyAdmin = async(otp) => {
    setBtnStatus(true)
    setErrorMessage('')
    const email = localStorage.getItem('email')
    const data = { otp, email }

    try{

      await axios.post(url, data, { headers: headers })
      .then((res) => {
        console.log('res', res)
        if (res.status === 200) {
          console.log(`account is verified successfully`)
          localStorage.setItem('isVerified', true)
          navigate('/profile')
        } else {
          console.log("Account Verification failed")
        }
      })
      .catch((err) => {
        if(err.message === 'Network Error'){
          setErrorMessage(err.message);
        }
        if (!err.response) {
          setErrorMessage('Network error. Please check your internet connection.');
          console.log('Network error: ', err);
        }
        if (err.status === 403 || 401 || 402) {
          setErrorMessage(err.response.data.msg)
        }
        console.log(err)
      })
    
    }
    catch(err){
      if(err.message === 'Network Error'){
        setErrorMessage(err.message);
      }
    }
    finally{
      setBtnStatus(false)
    }
    console.log('Verify Account')
  }
  return (

      <Container maxWidth="sm">
        <div className="box verifyBox">

        <div className="verifyDescription">
          <h1>Verify Your Account</h1>
          <p>Enter the OTP sent to your email to verify your account</p>
        </div>

        <div className="verifiyFields">
          <div className="field">
            <InpComp type="text" placeholder="Enter OTP" name="OTP" value={otp} onChange={(val) => setOTP(val)} />
          </div>
          <div className="errorMessage">
            {popUp ? null : <p className='error'>{errorMessage}</p>}
          </div>
          <div className="field btnField">

            <BtnCom text="Verify Account" onClick={() => verifyAdmin(otp)} varient="outlined" isAble={btnStatus? btnStatus: btnStatus}/>
          </div>
           
      <div className="backToHome">
      {
        errorMessage? <BtnCom text="back to home" onClick={()=>navigate('/')} varient="contained" />: null
      }
      </div>
        </div>
        </div>

      </Container>
  )
}

export default VerifyAccount