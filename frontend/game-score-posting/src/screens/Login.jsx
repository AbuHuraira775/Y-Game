import React, {  useState } from 'react'
import axios from 'axios';
import InpComp from '../compopnents/InpComp';
import BtnCom from '../compopnents/BtnComp';
import { useNavigate } from 'react-router-dom';
import {  Container } from '@mui/material';
import { useAuth } from '../store/auth';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [btnStatus, setBtnStatus] = useState(false)
  const  {storeTokenInLS} = useAuth()

  const url = "http://localhost:5000/api/admin/login";
  const headers = { "Content-Type": "application/json" };


  const login = async () => {
    setBtnStatus(true)
    setErrorMessage('')
    const data = {
      email, password
    };
    try {

      await axios.post(url, data, { headers: headers })
        .then((res) => {
          console.log(res.data.token);
          if (res.status === 200) {

            storeTokenInLS(res.data.token, res.data.data.email)

            navigate('/');
          }
          else if(!res){
            setErrorMessage('Network error. Please check your internet connection.');
          }
          else {
            alert("User login failed");
            localStorage.clear()

          }
        })
        .catch((err) => {
          setBtnStatus(true)

          if(err.message === 'Network Error'){
            setErrorMessage(err.message);
          }
          if (err.status === 400 || err.status === 401) {
            localStorage.clear()
            setErrorMessage(err.response.data.msg)
            console.log(err.response.data.msg)
          }
          if (!err.response) {
            setErrorMessage('Network error. Please check your internet connection.');
            console.log('Network error: ', err);
          }
            console.log('Network error: ', err);
        }

        );
    }
    catch (err) {

      console.log('err', err)
      // setBtnStatus(true)

    }
    finally {
      setPopUp(false)
      setBtnStatus(false)
    }

  }

  return (
    <>



      {/* <Container maxWidth="sm">
        <p>this is dialogue from MUI</p> */}
      {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} >
        </Box> */}

      <Container maxWidth="sm  bg-white w-full h-screen flex flex-col items-center justify-center">
        <div className="bg-slate-100 border-2 border-cyan-500 w-full box contactBox bg-white w-max h-max self-center m-auto p-5 rounded-xl flex flex-col items-center ">
          <div className="heading m-5 w-full">
            <h1 className='text-3xl auto font-bold '>Welome back </h1>
          </div>
          <div className="field w-full">
            <InpComp
              type="email"
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={(val) => setEmail(val)}
            />
          </div>

          <div className="field w-full"> 

            <InpComp
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(val) => setPassword(val)}
            />
          </div>
          <div className="errorMessage">
            {popUp ? null : <p className='error text-sm text-red-700 text-left mb-3'>{errorMessage}</p>}
          </div>
          <div className="w-full field btn-field">
            <BtnCom text={btnStatus? "Wait...":"LOGIN"}   onClick={() => login(email, password)} varient="contained"  isAble={btnStatus?btnStatus:btnStatus} className='w-full text-white  px-5 py-1 border-2 bg-cyan-600 rounded-md hover:bg-cyan-700 font-semibold mb-2'/>
          </div>

        </div>
      </Container>
      {/* </Container> */}


    </>
  )
}

export default Login