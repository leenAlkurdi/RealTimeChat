import React from "react";

const MsgCard = ({ message }) => {
  return (
    <div
      key={message.id}
      className="flex items-center p-2  hover:bg-gray-200 dark:hover:bg-[#374151] transition-colors duration-200"
    >
      <div className="w-12 h-12 rounded-full bg-[#7269EF] flex items-center justify-center relative">
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500  rounded-full"></span>
      </div>
      <div className="ml-3 flex justify-between items-center w-full whitespace-nowrap overflow-hidden">
        <div className="flex-1 mr-2 overflow-ellipsis overflow-hidden">
          <div className="font-semibold">{message.user}</div>
          <div
            className="text-sm dark:text-[#A7A9B6] text-gray-600 overflow-ellipsis overflow-hidden whitespace-nowrap"
            title={message.message}
          >
            {message.message}
          </div>
        </div>
        <div className="flex text-xs text-gray-400">{message.time}</div>
      </div>
    </div>
  );
};

export default MsgCard;
