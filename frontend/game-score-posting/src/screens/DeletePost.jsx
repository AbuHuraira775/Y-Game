import React from 'react'

function DeletePost({post_id,deleteWithId,onClose}) {
  
  return (
    <>
    <h3>Are you sure you want to delete this post?</h3>
      <p>Post ID: {post_id}</p>
      <button onClick={onClose}>Cancel</button>
      <button onClick={deleteWithId}>Confirm</button>
    </>
  )
}

export default DeletePost