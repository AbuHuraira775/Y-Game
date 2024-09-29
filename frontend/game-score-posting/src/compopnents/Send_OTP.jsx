import React, { useState } from 'react'
import BtnCom from './BtnComp'
import axios from 'axios'
import InpComp from './InpComp'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

function SendOTP() {
    const navigate = useNavigate()
    const [popUp, setPopUp] = useState(false)
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [btnStatus, setBtnStatus] = useState(false)

    const url = `http://localhost:5000/api/admin/otp-send`
    const headers = { "Content-Type": "application/json" };

    const sendOTP = async (email) => {
        setBtnStatus(true)
        setErrorMessage('')
        try {
            await axios.post(url, { email }, { headers: headers })
                .then((res) => {
                    console.log('res', res)
                    if (res.status === 200) {
                        localStorage.setItem('email', email)
                        navigate('/verify-account')
                        setErrorMessage('')
                    }
                })
                .catch((err) => {

                    if (err.message === 'Network Error') {
                        setErrorMessage(err.message);
                    }
                    else if(err.status === 401){
                        setErrorMessage(err.response.data.msg)
                    }
                })

        }
        catch (err) {
        }
        finally {
            setBtnStatus(false)
        }
    }
    return (
        <div>
            <Container maxWidth="sm" style={{ overflowX: 'hidden' }}>
                <div className="box sentOTPbox">
                    <div className="otpDescription">
                        <h1>Email Address</h1>
                        <p>Enter your registered Email address is to verify your account</p>
                    </div>
                    <div className="field">
                        <InpComp type="text" placeholder="Enter Email" name="email" value={email} onChange={(val) => setEmail(val)} />
                    </div>

                    <div className="errorMessage">

                        {popUp ? null : <p className='error'>{errorMessage}</p>}
                    </div>
                    <div className="field btn-field">
                        <BtnCom text="Send OTP" onClick={() => sendOTP(email)} varient="contained"isAble={btnStatus? btnStatus: btnStatus} />
                    </div>
                </div>
            </Container>

        </div>
    )
}

export default SendOTP