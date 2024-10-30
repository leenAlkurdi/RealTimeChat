import React from "react";

const OnlineCard = ({ user }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="w-12 h-12  rounded-full bg-[#7269EF] flex items-center justify-center relative">
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
      </div>
      <span className="text-center text-sm dark:text-white text-gray-700">
        {user}
      </span>
    </div>
  );
};

export default OnlineCard;
