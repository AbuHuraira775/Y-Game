import React, { useState } from 'react'
import axios from 'axios';
import InpComp from '../compopnents/InpComp'; 
import BtnCom from '../compopnents/BtnComp';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const url = "http://localhost:5000/api/admin/login";
  const headers = { "Content-Type": "application/json" };

  const login = async() => {
    const data = {
      email, password
    };
    axios.post(url, data, { headers: headers })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem('token', res.data.data.token);
          localStorage.setItem('id', res.data.data._id);
          localStorage.setItem('email', res.data.data.email);
          navigate('/profile');
        } else {
          alert("User login failed");
        } 
      })
      .catch((err) => {
        console.log('API failed : ',err);
      });

  }
  return (
    <>
    <InpComp 
      type="email" 
      placeholder="Enter Email" 
      value={email} 
      name="email" 
      onChange={(val) => setEmail(val)} 
    />   
    <InpComp 
      type="password" 
      placeholder="Enter Password" 
      value={password} 
      name="password" 
      onChange={(val) => setPassword(val)} 
    />    
      <BtnCom text="Login " onClick={()=>login( email, password)}/>
    </>
  )
}

export default Login