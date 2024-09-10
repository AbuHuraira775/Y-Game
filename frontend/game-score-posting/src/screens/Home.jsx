import React, { useEffect, useState } from 'react'

function Home() {
    const [post, setPost] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchPost = async () => {
        const response = await fetch('http://localhost:5000/api/user/')
        const data = await response.json()
        setPost(data.data)
        setLoading(false) // Move this here to stop loading after fetching the posts
        console.log('posts:', data)
    }

    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <>
            <h1>Home</h1>
            <div>
                <h2>Welcome to Game Score Posting</h2>
                <p>Game Score Posting is a web application where you can post, update and delete your game scores.</p>
                <p>It is a simple and easy to use application where you can keep track of your game scores.</p>
                <p>It is a secure application where you need to verify your account before you can post, update and delete your game scores.</p>
                <p>Click on the Sign Up link to create an account and then you can login to post, update and delete your game scores.</p>
            </div>
            <div>
                <h2>Posts</h2>
                {
                    loading ? <h2>Loading...</h2> : post.map((post) => {
                        return (
                            <div key={post._id}>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                                <p>{post.score}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home
