import React from 'react';

const PrimaryButton = ({ handler, children }) => {
  const oldButton = () => (
    <button className="group">
      <div className="shadow-3xl group-active:shadow-none shadow-red-800 group-active:ml-1 group-active:-mt-1 w-fit ease-in-out duration-150">
        <div
          className="text-xl py-1 px-3 bg-primary text-gray-50 font-sans ease-in-out duration-300"
          onClick={handler}
        ></div>
      </div>
    </button>
  );

  return (
    <>
      <button
        className="btn relative inline-block font-medium group"
        onClick={handler}
      >
        <span className="absolute inset-0 w-full h-full transition duration-400 ease-out transform bg-orange-500 -translate-x-0 -translate-y-0 border-tertiary border-2" />
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-tertiary group-hover:bg-primary group-hover:-translate-x-1 group-hover:-translate-y-1 ease-in-out duration-200 group-active:-translate-x-0 group-active:-translate-y-0" >
          {children}
        </span>
        <span class="relative text-tertiary group-hover:text-white font-sans px-4">
          x
        </span>
      </button>
    </>
  );
};

export default PrimaryButton;
