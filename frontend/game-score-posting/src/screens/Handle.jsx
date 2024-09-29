import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function Handle() {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/')
    },[])
  return (
    <div>Handle</div>
  )
}

export default Handle