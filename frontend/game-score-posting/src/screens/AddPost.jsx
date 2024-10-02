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

    <Container maxWidth='sm'>

      {/* 
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <DemoItem label="Uncontrolled calendar">
          <DateCalendar defaultValue={dayjs('2022-04-17')} />
        </DemoItem>
        <DemoItem label="Controlled calendar">
          <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider> */}

      <div className="box addPostBox">
        <div className="addPostHeading heading">
          <h1>Enter Number</h1>
          <p>Enter the number. Number should be greater than 0</p>
        </div>
        <div className="addPostsFields">
          <div className="field">
            <InpComp type="number" placeholder="Enter Score" name="score" value={number} onChange={(number) => setScore(number)} />
          </div>
          <div className="errorMessage">
            {popUp ? null : <p className='error'>{errorMessage}</p>}
          </div>
          <div className="field btnField">
            <BtnCom text={btnText} onClick={sendPost} endIcon={<SendIcon />} varient="outlined"  isAble={btnStatus?btnStatus:btnStatus} />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AddPost