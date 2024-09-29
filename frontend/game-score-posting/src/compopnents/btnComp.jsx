import { Button } from "@mui/material";
import React from "react";

const BtnCom = ({ text, onClick, varient, endIcon, isAble }) => {
    return <Button disabled={isAble} variant={varient}  onClick={onClick} endIcon={endIcon}>{text}</Button>
    // <button onClick={onClick}>{text}</button>;
}

export default BtnCom;