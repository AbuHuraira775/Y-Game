import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import DeletePost from './DeletePost';
import axios from 'axios';
import UpdatePost from './UpdatePost';
import { Container, IconButton, Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useAuth } from '../store/auth';


function Home() {
    const { isLoggedIn } = useAuth()
    const navigate = useNavigate()
    const { userAuthentication } = useAuth()
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [selectScore, setSelectScore] = useState(null);
    const [selectedPostScore, setSelectedPostScore] = useState(null);
    const [postDelete, setPostDelete] = useState(false)
    const [edit, setEdit] = useState(false);
    const [popUp, setPopUp] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const postsPerPage = 20; // Number of posts per page

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
        }
        catch (err) {

            if (err.message === 'Network Error') {
                setErrorMessage(err.message);
            }

            else if (err.status === 400 || 401 || 402 || 403) {
                setErrorMessage(err)
            }
            else {
                setErrorMessage('Network error. Please check your internet connection.');
                console.log('Network error: ', err);
            }
        }
    }

    useEffect(() => {
        try {
            setEdit(false)
            setPostDelete(false)
            fetchPost()
            userAuthentication()
        }
        catch (err) {
            console.log('home', err)
        }
    }, [])

    const onClose = () => {
        setPostDelete(false)
        setEdit(false)
    }
    const deleteWithId = async (id) => {
        console.log(id)
        let email = localStorage.getItem('email')
        let data = JSON.stringify({
            email
        });

        let config = {
            method: 'DELETE',
            maxBodyLength: Infinity,
            url: `http://localhost:5000/api/admin/delete-post/${selectedPostId}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {

            await axios.request(config)
                .then((response) => {
                    setPostDelete(false);
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
        if (isLoggedIn) {
            setSelectedPostId(id)
            setSelectScore(score)
            setPostDelete(true);
            setEdit(false)
            console.log(id,score)
        }
        else {
            setPostDelete(false)
        }
    }

    const editPost = (id, score) => {
        if (isLoggedIn) {
            setEdit(true);
            setSelectedPostId(id)
            setSelectedPostScore(score)
            setPostDelete(false);
            console.log('edit', edit)
        }
        else {
            setEdit(false)
        }
    }
    const imgURL = `https://i.pinimg.com/736x/f4/36/8a/f4368a88f9660c02d939410dd3f8103a.jpg`
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className='bg-whit'>

            <div className={` ${ edit || postDelete ? "opacity-50 overflow-hidden" :""} relative z-0  allPosts  bg-white w-full p-5 `} disabled>

                <div className="heading text-3xl text-slate-700 font-bold mb-5 mt-10">
                    <h1>Your Daily Game Scores</h1>
                </div>

                <div className="postDisplayArea w-full ">

                    {
                        loading ? <div>
                            <h2>Fetching Your Data</h2>
                            <p>Please Wait...</p>
                        </div> :
                            <div className="allCards grid grid-cols-1 gap-8 sm:grid-cols-2  md:grid-cols-3 ">

                                {currentPosts.map((post, ind) => {
                                    const date = new Date(post.date).toLocaleDateString()
                                    const time = new Date(post.date).toLocaleTimeString()
                                    return (

                                        <Container key={post._id} className='bg-slate-200 p-5 rounded-3xl  border-2 border-slate-300 hover:bg-slate-200 hover:cursor-pointer hover:-translate-y-1 duration-1000'>

                                            <div className="card grid grid-cols-1">

                                                <div className="cardImage">
                                                    <img
                                                        src={`${imgURL}`}
                                                        alt="gameImage"
                                                        className=' rounded-2xl hover:shadow-lg object-cover h-40 w-full'
                                                    />
                                                </div>

                                                <div className="cardContent mt-3 p-1 text-black text-sm leading-6">
                                                    <div className="cardScore flex justify-between items-center">
                                                        <h1>Score: {post.score}</h1>
                                                    </div>
                                                    <div className="cardDate ">
                                                        <p>Date: {date}</p>
                                                    </div>
                                                    <div className="cardDate">
                                                        <p>Time: {time}</p>
                                                    </div>
                                                    <div className="cardPlayer">
                                                        <p>Player: {post.name}</p>
                                                    </div>
                                                </div>

                                                {
                                                    isLoggedIn ?
                                                        <div className="action flex items-center justify-between mt-3">

                                                            <button className="delete flex bg-red-600 text-white px-2 rounded-md items-center justify-evenly" onClick={() => deletePost(post._id, post.score)}>
                                                                <p>Delete</p>
                                                                <IconButton aria-label="delete" >
                                                                    <MdDelete color='error ' className='text-sm text-white' />
                                                                </IconButton>
                                                            </button>
                                                            <div className="actions flex ">
                                                                <button onClick={() => editPost(post._id, post.score)} className=" delete flex bg-green-700 text-white px-3 rounded-lg items-center justify-evenly" >
                                                                    <p >Edit</p>
                                                                    <IconButton aria-label="edit" >
                                                                        <MdEdit className='editIcon text-sm text-white disabled' />
                                                                    </IconButton>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        :
                                                        null
                                                }
                                            </div>

                                        </Container>
                                    )
                                })}
                            </div>
                    }

                </div>
                {popUp ? null : <p classnam>{errorMessage}</p>}

                {
                    postDelete ?
                        <DeletePost post_id={selectedPostId} onClose={onClose} score={selectScore} deleteWithId={() => deleteWithId(selectedPostId,errorMessage)} />
                        : null
                }
                {
                    edit ?
                        <UpdatePost post_id={selectedPostId} onClose={onClose} value={selectedPostScore} edit={edit} />
                        : null
                }


            </div>
            <div className="bg-cyan-600 flex items-center justify-center py-4 relative z-0">

                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(post.length / postsPerPage)} // Total number of pages
                        // count='80'
                        page={currentPage}
                        color="primary" />
                </Stack>
            </div>


        </div>
    )
}

export default Home
