import { Button } from "@mui/material";
import React from "react";

const BtnCom = ({ text, onClick ,  className }) => {
    // return <Button disabled={isAble} variant={varient}  onClick={onClick} endIcon={endIcon} color={color} className="bg-blue-100">{text}</Button>
    return <button onClick={onClick} className={className}>{text}</button>;
}

export default BtnCom;