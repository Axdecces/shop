import React, { useContext, useEffect } from 'react';

const Hero = ({ title }) => {

  return (
    <>
      <h1 className="font-sans text-8xl ease-in-out duration-300 cursor-default font-bold text-orange-800 text-center uppercase md:block hidden">
        {title}
      </h1>
      <h1
        className="inset-0 absolute font-sans text-8xl ease-in-out duration-300 cursor-default font-bold text-primary text-center translate-x-0 -translate-y-1.5
        hover:translate-y-1.5 w-full h-fit uppercase hidden md:block"
      >
        {title}
      </h1>
    </>
  );
};

export default Hero;
