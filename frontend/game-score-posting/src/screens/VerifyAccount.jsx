import React, { useState } from 'react'
import InpComp from '../compopnents/InpComp'
import BtnCom from '../compopnents/BtnComp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function VerifyAccount() {
  const [otp, setOTP] = useState('')
  const [email, setEmail] = useState('')
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
  const verifyAdmin = (otp) => {
    const email = JSON.parse(localStorage.getItem('user')).email
    const data = {otp,email}
    axios.post(url,data,{headers:headers})
    .then((res) => {
      console.log('res',res)
      if (res.status === 200) {
        console.log(`account is verified successfully`)
        localStorage.clear()
        fetchAdmin()
        navigate('/')
      } else {
        console.log("Account Verification failed")
      }
    })
    .catch((err) => {
      console.log(err)
    })
    console.log('Verify Account')
  }
  return (
    <div>
      <p>You are not verified. Please verify your account first </p>
      <div className="warninng">
        <p>If you are not verified you will not be able to add, delete or change your scores</p>
        <p>Please verify your account first to fully enjoy the experience</p>
      </div>
      <InpComp  type="text" placeholder="Enter OTP" name="OTP" value={otp} onChange={(val) => setOTP(val)} />  
      <BtnCom text="Verify Account" onClick={()=>verifyAdmin(otp)} />

    </div>
  )
}

export default VerifyAccount