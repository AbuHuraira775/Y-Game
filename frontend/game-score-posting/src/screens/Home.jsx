import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react'
import { MdEdit, MdEditLocation, MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";
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
    const [selectScore, setSelectScore] = useState(null);
    const [selectedPostScore, setSelectedPostScore] = useState(null);
    const [isAuth, setIsAuth] = useState(false)
    const [popUp, setPopUp] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const postsPerPage = 20; // Number of posts per page
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
            console.log('posts:', data)
        }
        catch (err) {

            if (err.message === 'Network Error') {
                setErrorMessage(err.message);
            }

            else if (err.status === 400 || 401 || 402 || 403) {
                console.log(err)
                // setErrorMessage(err)
            }
            else {
                setErrorMessage('Network error. Please check your internet connection.');
                console.log('Network error: ', err);
            }
            console.log('home ',err)
        }
    }

    useEffect(() => {
        try {
            fetchPost()
        }
        catch (err) {
            console.log('home', err)
        }
    }, [])

    const onClose = () => {
        setIsAuth(false)
        setEdit(false)
        navigate('/handle')
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
    const deletePost = (id, score) => {
        let token = localStorage.getItem("token");
        let session = localStorage.getItem("session_id");
        console.log(id)
        if (token && session) {
            setSelectedPostId(id)
            setSelectScore(score)
            setIsAuth(true);
            setEdit(false)
        }
        else {
            setIsAuth(false)
        }
    }

    const editPost = (id, score) => {
        // alert('edit')
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
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };
    return (
        <>
            <div className='allPosts'>

            <div className="heading">
                                    <h1>Your Daily Cards</h1>
                                </div>
                {


                    loading ? <div>
                        <h2>Fetching Your Data</h2>
                        <p>Please Wait...</p>
                    </div> : currentPosts.map((post, ind) => {
                        return (
                            
                                <Container key={post._id} className='cpost'>
                                    {/* <div className="cardLogo">
                                    <img src="https://i.pinimg.com/474x/f8/b2/c4/f8b2c434ccea75a8e018bc882152040d.jpg" alt="" />
                                    </div> */}
                                    <div className="cardAbout">


                                        <div className="cpost">
                                            <div className="postCard">
                                                <div className="postContent">
                                                    <div className="cpks c center"><p>PKS</p></div>
                                                    <div className="creport c"><p>Reports {post.score}</p></div>
                                                    <div className="cdate  c"><p>{post.date}</p></div>
                                                </div>
                                            </div>
                                            <div className="clink b">
                                                <p>Visit Site: <Link to={url}>Website</Link></p>
                                                <div className="actions">
                                                    <div className="edit">
                                                        <IconButton aria-label="edit">
                                                            <MdEdit onClick={() => editPost(post._id, post.score)} className='editIcon' />
                                                        </IconButton>
                                                    </div>
                                                    <div className="delete">
                                                        <IconButton aria-label="delete">
                                                            <DeleteIcon onClick={() => deletePost(post._id, post.score)} color='error' />
                                                        </IconButton>
                                                    </div>
                                                </div>
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
                        <DeletePost post_id={selectedPostId} onClose={onClose} score={selectScore} deleteWithId={() => deleteWithId(selectedPostId)} />
                        : null
                }
                {
                    edit ?
                        <UpdatePost post_id={selectedPostId} onClose={onClose} value={selectedPostScore} edit={edit} />
                        : null
                }


            </div>
            <div className="pagination box">

                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(post.length / postsPerPage)} // Total number of pages
                        // count='80'
                        page={currentPage}
                        onChange={handleChange}
                        color="primary" />
                </Stack>
            </div>


        </>
    )
}

export default Home
