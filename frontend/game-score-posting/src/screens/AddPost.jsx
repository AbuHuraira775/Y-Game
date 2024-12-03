import React, { useState } from 'react'
import InpComp from '../compopnents/InpComp'
import BtnCom from '../compopnents/BtnComp'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


function AddPost() {
  const [number, setScore] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [btnStatus, setBtnStatus] = useState(false)
  const [btnText, setBtnText] = useState('Add Post')
  const navigate = useNavigate();

  const url = "http://localhost:5000/api/admin/add-post";
  const headers = { "Content-Type": "application/json" };


  const sendPost = async () => {
    setBtnStatus(true);
    setErrorMessage('')
    setBtnText('Adding Post...')
    const email = localStorage.getItem('email');
    const date = new Date().toLocaleString();
    const data = {
      number, email, date
    };
    try{

      await axios.post(url, data, { headers: headers })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate('/');
        }
        else if (!res) {
          setErrorMessage('Network error. Please check your internet connection.');
        }
        else {
          setErrorMessage('Network error. Please check your internet connection.');
          setBtnText('Add Post')
        }
      })
      .catch((err) => {

        if(err.message === 'Network Error'){
          setErrorMessage(err.message);
        }
        else if (err.status === 401 || 402 || 403) {
          setErrorMessage(err.response.data.msg)
        }
        else {
          setErrorMessage('Network error. Please check your internet connection.');
          console.log('Network error: ', err);
        }
        setBtnText('Add Post')
        console.log('API failed : ', err);
      })
    setBtnStatus(false);
  
    }
    catch(err){
      console.log('catch err',err)
    }
    finally{
      console.log('catch err')
      
      setBtnStatus(false)
    }}

  return (

    <Container maxWidth='sm bg-white  w-full h-screen flex  flex-col items-start justify-between'>

      <div className="box contactBox bg-slate-100 border-2 border-slate-300 w-max h-max self-center m-auto p-5 rounded-xl flex flex-col items-center">
        <div className="w-full heading my-5 flex flex-col ">
          <h1 className='w-full text-3xl auto font-bold'>Enter Number</h1>
          <p className='w-full text-xs mt-1'>Enter the number. Number should be greater than 0</p>
        </div>
        <div className="w-full  addPostsFields flex flex-col items-center">
          <div className="w-full ">
            <InpComp type="number" placeholder="Enter Score" name="score" value={number} onChange={(number) => setScore(number)} />
          </div>
          <div className="w-full  errorMessage">
            {popUp ? null : <p className='error text-xs text-red-700 text-left mb-3'>{errorMessage}</p>}
          </div>
          <div className="w-full  field btnField">
            <BtnCom text={btnText} onClick={sendPost} endIcon={<SendIcon />} varient="outlined"  isAble={btnStatus?btnStatus:btnStatus} className='w-full text-white  px-5 py-1 border-2 bg-cyan-600 rounded-md hover:bg-cyan-700 font-semibold mb-2'/>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AddPost