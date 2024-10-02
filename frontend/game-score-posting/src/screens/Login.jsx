import React, { useEffect, useState } from 'react'
import axios from 'axios';
import InpComp from '../compopnents/InpComp';
import BtnCom from '../compopnents/BtnComp';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Fab, TextField } from '@mui/material';
import { MdAddCircleOutline } from 'react-icons/md';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [btnStatus, setBtnStatus] = useState(false)

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
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('token', res.data.data.token);
            localStorage.setItem('session_id', res.data.data._id);
            localStorage.setItem("isVerified", res.data.data.isVerified);
            localStorage.setItem("email", res.data.data.email);

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
          // setBtnStatus(true)

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

      <Container maxWidth="sm">
        <div className="box loginDialoge center">
          <div className="loginHeading">
            <h1>Welome back to PKS</h1>
          </div>
          <div className="field">
            <InpComp
              type="email"
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={(val) => setEmail(val)}
            />
          </div>

          <div className="field"> 

            <InpComp
              type="password"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(val) => setPassword(val)}
            />
          </div>
          <div className="errorMessage">
            {popUp ? null : <p className='error'>{errorMessage}</p>}
          </div>
          <div className="field btn-field">
            <BtnCom text={btnStatus? "Wait...":"LOGIN"}   onClick={() => login(email, password)} varient="contained"  isAble={btnStatus?btnStatus:btnStatus}/>
          </div>

        </div>
      </Container>
      {/* </Container> */}


    </>
  )
}

export default Login