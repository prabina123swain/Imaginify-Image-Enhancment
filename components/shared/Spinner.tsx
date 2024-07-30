import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-16 h-16 animate-[opposites_2.5s_ease-out_infinite]">
        <div className="absolute w-8 h-8 bg-[#1e90ff] bottom-0 left-8 transform-origin-top-left animate-[tlbr_2.5s_ease-out_infinite]"></div>
        <div className="absolute w-8 h-8 bg-red-500 top-0 left-0 transform-origin-bottom-right animate-[trbl_2.5s_ease-out_infinite]"></div>
        <div className="absolute w-8 h-8 bg-[#ffd700] top-8 right-8 transform-origin-top-right animate-[tlbr_2.5s_ease-out_infinite]"></div>
        <div className="absolute w-8 h-8 bg-green-500 top-0 left-8 transform-origin-bottom-left animate-[trbl_2.5s_ease-out_infinite]"></div>
      </div>
    </div>
  );
};

export default Spinner;
