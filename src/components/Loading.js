import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#7269EF] border-t-transparent mb-4"></div>
        <h1 className="text-2xl text-[#7269EF] font-semibold">Loading...</h1>
        <p className="text-gray-600 mt-2">Please wait a moment.</p>
      </div>
    </div>
  );
};

export default Loading;