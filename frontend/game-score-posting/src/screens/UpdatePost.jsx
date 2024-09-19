import React from 'react'
import InpComp from '../compopnents/InpComp'
import BtnCom from '../compopnents/BtnComp'

function UpdatePost() {
  return (
    <div>
      <InpComp type="text" placeholder="Enter Title" />
      <InpComp type="text" placeholder="Enter Title" />
      <InpComp type="text" placeholder="Enter Title" />
      <BtnCom text="Update Post" />
    </div>
  )
}

export default UpdatePost