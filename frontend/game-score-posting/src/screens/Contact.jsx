import React, { useState } from 'react'
import InpComp from '../compopnents/InpComp'
import BtnCom from '../compopnents/BtnComp'
import axios from 'axios';

function Contact() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const url = `http://localhost:5000/api/user/contact`
  const headers = { "Content-Type": "application/json" };

  const submitForm = (email, name, message) => {
    const data = { email, name, message }
    axios.post(url, data, { headers: headers })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          alert("Message sent successfully")
        } else {
          alert("Message sending failed")
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }
  return (
    <div>
      <InpComp type="email" placeholder="Enter Email" name="email" value={email} onChange={(val) => setEmail(val)} />
      <InpComp type="text" placeholder="Enter Name" name="name" value={name} onChange={(val) => setName(val)} />
      <InpComp type="text" placeholder="Enter Message" name="message" value={message} onChange={(val) => setMessage(val)} />
      <BtnCom text="Submit" onClick={() => submitForm(email, name, message)} />
    </div>
  )
}

export default Contact