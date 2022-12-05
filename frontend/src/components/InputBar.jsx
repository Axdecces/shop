import React from 'react';

const InputBar = ({ placeholder }) => {
  return (
    <>
        <input
          className="w-80 h-10 rounded-lg border-2 border-blue-400 pl-2"
          placeholder={placeholder}
        />
    </>
  );
};

export default InputBar;
