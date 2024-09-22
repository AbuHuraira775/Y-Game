import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

function Home() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchPost = async () => {
        const response = await fetch('http://localhost:5000/api/user/')
        const data = await response.json()
        setPost(data.data)
        setLoading(false)
        console.log('posts:', data)
    }

    useEffect(() => {
        localStorage.clear()
        fetchPost()
    }, [])

    const deletePost = (id) => {
        const clickedPost = post.find(p => p._id === id);
        console.log('clicked post:', clickedPost);
        console.log(clickedPost)
    }
    const editPost = (id) => {
        const clickedPost = post.find(p => p._id === id);
        console.log(clickedPost)
        navigate('/delete-post')
    }
    return (
        <>
            <h1>Home</h1>

            <div>
                <h2>Posts</h2>
                {
                    loading ? <h2>Loading...</h2> : post.map((post) => {
                        return (
                            <div key={post._id} className='post'>
                                <div className="content">
                                    <h3 className='post-title'>{post.title}</h3>
                                    <p className='post-description'>{post.description}</p>
                                    <p className='post-score'>{post.score}</p>
                                </div>
                                <div className="actions">
                                    <MdOutlineDeleteOutline onClick={() => deletePost(post._id)} />
                                    <CiEdit onClick={() => editPost(post._id)} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home
