import React from "react";

const BtnCom = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
}

export default BtnCom;