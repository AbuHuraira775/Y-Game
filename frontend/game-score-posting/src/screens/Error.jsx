import React from 'react'

function Error({description,title}) {
  return (
    <div className='errorBox box heading'>
      <h2 className="errorHeading">{title}</h2>
      <p className="errorHeading">{description}</p>
    </div>
  )
}

export default Error