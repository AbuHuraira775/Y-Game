import React, { useState } from 'react'
import BtnCom from './BtnComp'
import axios from 'axios'
import InpComp from './InpComp'
import { useNavigate } from 'react-router-dom'

function SendOTP() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const url = `http://localhost:5000/api/admin/otp-send`
    const headers = { "Content-Type": "application/json" };

    const sendOTP = (email) => {

        axios.post(url, { email }, { headers: headers })
            .then((res) => {
                console.log('res', res)
                if (res.status === 200) {
                    alert("OTP sent successfully")
                    navigate('/verify-account')
                } else {
                    alert("OTP sending failed")
                }
            })
            .catch((err) => {
                console.log('err', err)
            })

    }
    return (
        <div>
            <InpComp type="text" placeholder="Enter Email" name="email" value={email} onChange={(val) => setEmail(val)} />
            <BtnCom text="Send OTP" onClick={() => sendOTP(email)} />
        </div>
    )
}

export default SendOTP