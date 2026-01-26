import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      {/* Logo / Brand Initial */}
      <div className="mb-6 flex items-center gap-2">
        <div className="h-14 w-14 rounded-xl bg-amber-700 flex items-center justify-center text-white text-2xl font-bold animate-pulse">
          TL
        </div>
        <span className="text-2xl font-semibold tracking-wide text-gray-800">
          TimmyLux
        </span>
      </div>

      {/* Wood Bar Loader */}
      <div className="relative w-56 h-2 bg-amber-100 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 animate-loader-slide" />
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-sm tracking-wide text-gray-500 animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;
