import React from 'react';

const InpComp = ({ type, placeholder, value, name, onChange }) => {
  return (
    <input 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      name={name} 
      onChange={(e) => onChange(e.target.value)} 
    />
  );
};

export default InpComp;