import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DeletePost from './DeletePost';
import axios from 'axios';
import { useAuth } from '../routers/CustomRoutes';
import UpdatePost from './UpdatePost';
import { Card, Container, IconButton, Pagination, Typography } from '@mui/material';
import BtnCom from '../compopnents/BtnComp';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from '../compopnents/Navbar';

function Home() {

    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectedPostScore, setSelectedPostScore] = useState(null);
    const [isAuth, setIsAuth] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    console.log('home', useAuth())


    const navigate = useNavigate()

    const fetchPost = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/')
            const data = await response.json()
            if (!response) {
                setErrorMessage('Network error. Please check your internet connection.');
                console.log('Network error: ', response);
            }
            if (response.status === 200) {
                setPost(data.data)
                setLoading(false)
            }
            if (!response) {
                setErrorMessage('Network error. Please check your internet connection.');
                console.log('Network error: ', response);
            }
            console.log('posts:', data)
        }
        catch (err) {

            if (err.message === 'Network Error') {
                setErrorMessage(err.message);
            }

            if (err.status === 400 || 401 || 402 || 403) {
                setErrorMessage(err.response.data.msg)
            }
            else {
                setErrorMessage('Network error. Please check your internet connection.');
                console.log('Network error: ', err);
            }
        }
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const onClose = () => {
        setIsAuth(false)
        setEdit(false)
    }
    const deleteWithId = async (id) => {
        console.log(id)
        // let email = localStorage.getItem('email')
        let data = JSON.stringify({
            "email": "gsite616@gmail.com"
        });

        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/api/admin/delete-post/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {

            await axios.request(config)
                .then((response) => {
                    alert('Post deleted successfully')
                    setIsAuth(false);
                    console.log(JSON.stringify(response));
                })
                .catch((err) => {

                    if (!err.response) {
                        setErrorMessage('Network error. Please check your internet connection.');
                        console.log('Network error: ', err);
                    }

                    if (err.status === 400 || 401 || 402 || 403) {
                        setErrorMessage(err.response.data.msg)
                    }
                });
        }
        catch (err) {
            console.log('error', err)
        }
        finally {
            fetchPost()
        }
    }
    const deletePost = (id, onClose, deleteWithId) => {
        let token = localStorage.getItem("token");
        let session = localStorage.getItem("session_id");
        console.log(id)
        if (token && session) {
            setSelectedPostId(id)
            setIsAuth(true);
            setEdit(false)
        }
        else {
            setIsAuth(false)
        }
    }

    const editPost = (id, score) => {
        let token = localStorage.getItem("token");
        let session = localStorage.getItem("session_id");
        console.log(id, score)
        if (token && session) {
            setSelectedPostId(id)
            setSelectedPostScore(score)
            setEdit(true);
            setIsAuth(false);

        }
        else {
            setEdit(false)
        }
    }
    const url = 'https://pks.com/'

    return (
        <>
            <div className='allPosts'>

                {


                    loading ? <h2>Loading...</h2> : post.map((post, ind) => {
                        return (
                            <Container key={post._id} className='post'>
                                <div className="cardLogo">
                                    <img src="https://i.pinimg.com/474x/f8/b2/c4/f8b2c434ccea75a8e018bc882152040d.jpg" alt="" />
                                </div>
                                <div className="cardAbout">

                                    <div className="content">
                                        {/* <p className="cardNumber p">{ind+1}</p> */}
                                        <h1 className="pks p">PKS</h1>
                                        <h3 className="report p">Report</h3>
                                        <p className="date p">Updated on: {post.date}</p>
                                        <h5 className='post-score p'>{post.score}</h5>
                                        <Link to={url}><h5>{url}</h5></Link>
                                    </div>




                                    <div className="actions">
                                        <div className="delete">
                                            <IconButton aria-label="delete">
                                                <DeleteIcon onClick={() => deletePost(post._id)} />
                                            </IconButton>
                                        </div>
                                        <div className="edit">
                                            <IconButton aria-label="delete">
                                                <MdEdit onClick={() => editPost(post._id, post.score, post.title, post.description)} />
                                            </IconButton>
                                        </div>
                                    </div>

                                </div>

                            </Container>
                        )
                    })
                }

                {popUp ? null : <p>{errorMessage}</p>}

                {
                    isAuth ?
                        <DeletePost post_id={selectedPostId} onClose={onClose} deleteWithId={() => deleteWithId(selectedPostId)} />
                        : null
                }
                {
                    edit ?
                        <UpdatePost post_id={selectedPostId} onClose={onClose} value={selectedPostScore} edit={edit} />
                        : null
                }

            </div>


        </>
    )
}

export default Home
