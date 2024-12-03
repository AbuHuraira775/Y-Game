import React from 'react';

const InpComp = ({ type, placeholder, value, name, onChange }) => {
  return (
    <input 
    className='border-2 border-slate-200 focus:border-slate-300 outline-none border-gray-300 p-2 rounded-md  mb-5 bg-slate-100 w-full'
      type={type} 
      placeholder={placeholder} 
      value={value} 
      name={name} 
      onChange={(e) => onChange(e.target.value)} 
    />
  );
};

export default InpComp;