import { Button } from "@mui/material";
import React from "react";

const BtnCom = ({ text, onClick, varient, endIcon, isAble,color }) => {
    return <Button disabled={isAble} variant={varient}  onClick={onClick} endIcon={endIcon} color={color}>{text}</Button>
    // <button onClick={onClick}>{text}</button>;
}

export default BtnCom;