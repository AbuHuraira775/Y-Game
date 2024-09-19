import React, { useState } from 'react';
import axios from 'axios';
import InpComp from '../compopnents/InpComp'; 
import BtnCom from '../compopnents/BtnComp';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const url = "http://localhost:5000/api/admin/register";
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('');
  const headers = { "Content-Type": "application/json" };
  
  const register = (name, email, password, address, phone, type) => {
    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
      type: type
    };
    axios.post(url, data, { headers: headers })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("User registered successfully");
          navigate('/verify-account');
        } else {
          alert("User registration failed");
        }
      })
      .catch((err) => {
        console.log(err);
      });

}
  return (
    <div>
    <InpComp 
      type="text" 
      placeholder="Enter name" 
      value={name} 
      name="name" 
      onChange={(val) => setName(val)} 
    />
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
    <InpComp 
      type="text" 
      placeholder="Enter Address" 
      value={address} 
      name="address" 
      onChange={(val) => setAddress(val)} 
    />
    <InpComp 
      type="text" 
      placeholder="Enter Phone" 
      value={phone} 
      name="phone" 
      onChange={(val) => setPhone(val)} 
    />
    <InpComp 
      type="text" 
      placeholder="Enter Type" 
      value={type} 
      name="type" 
      onChange={(val) => setType(val)} 
    />

      <BtnCom text="Sign Up" onClick={()=>register(name, email, password, address, phone, type)}/>
    </div>
  );
};

export default SignUp;
