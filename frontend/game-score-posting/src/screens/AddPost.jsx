import React, { useState } from 'react'
import InpComp from '../compopnents/InpComp'
import BtnCom from '../compopnents/BtnComp'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState()
  const [score, setScore] = useState()
  const navigate = useNavigate();
    
  const url = "http://localhost:5000/api/admin/add-post";
  const headers = { "Content-Type": "application/json" };

  const sendPost = async() => {
    const email = JSON.parse(localStorage.getItem('user')).email;
    const data = {
      title, description, score,email
    };
    axios.post(url, data, { headers: headers })
      .then((res) => {
        console.log(res);
        if (res.status === 200) { 
          navigate('/');
        } else {
          alert("You score posting failed");
        } 
      })
      .catch((err) => {
        if(err.status === 400){
          alert('score postsing is failed')
        }
        console.log(`err -> ${err.response.data.msg}`)
        console.log('API failed : ',err);
      });

  }

  return (
    <div>
      <InpComp type="text" placeholder="Enter Title" value={title} name="title" onChange={(val)=>setTitle(val)}/>
      <InpComp type="text" placeholder="Enter Description" value={description} name="description"   onChange={(val)=>setDescription(val)}/>
      <InpComp type="number" placeholder="Enter Score" value={score} name="score" onChange={(val)=>setScore(val)}/>
      <BtnCom text="Add Post" onClick={sendPost}/>
    </div>
  )
}

export default AddPost