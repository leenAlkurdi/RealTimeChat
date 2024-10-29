import React, { useState, useEffect, useRef } from "react";  
import { RiSendPlane2Fill } from "react-icons/ri";  

const Chat = () => {  
  const [messages, setMessages] = useState([  
    {  
      id: 1,  
      from: "Doris Brown",  
      to: "Leen",  
      text: "Yeah, everything is fine.",  
      time: "10:49 AM",  
    },  
    {  
      id: 2,  
      from: "Doris Brown",  
      to: "Leen",  
      text: "Next meeting tomorrow at 10:00 AM.",  
      time: "10:46 AM",  
    },  
    {  
      id: 3,  
      from: "Leen",  
      to: "Doris Brown",  
      text: "Sounds good!",  
      time: "10:47 AM",  
    },  
    {  
      id: 4,  
      from: "Leen",  
      to: "Doris Brown",  
      text: "Looking forward to it.",  
      time: "10:48 AM",  
    },  
  ]);  

  const [inputValue, setInputValue] = useState("");  
  const messagesEndRef = useRef(null);  

  const handleSendMessage = () => {  
    if (inputValue.trim()) {  
      const newMessage = {  
        id: messages.length + 1,  
        from: "Leen",  
        to: "Doris Brown",  
        text: inputValue,  
        time: new Date().toLocaleTimeString([], {  
          hour: "2-digit",  
          minute: "2-digit",  
          hour12: true 
        }),  
      };  
      setMessages((prevMessages) => [...prevMessages, newMessage]);  
      setInputValue("");  
    }  
  };  

  useEffect(() => {  
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });  
  }, [messages]);  

  const parseTime = (timeStr) => {  
    const [time, modifier] = timeStr.split(" ");  
    let [hours, minutes] = time.split(":").map(Number);  
    if (modifier === "PM" && hours < 12) {  
      hours += 12;  
    }  
    if (modifier === "AM" && hours === 12) {  
      hours = 0;  
    }  
    return hours * 60 + minutes;  
  };  

  return (  
    <div className="h-screen dark:bg-[#262E35] bg-white flex flex-col">  
      <div className="flex items-center sticky top-0 z-10 space-x-2 border-b border-gray-300 dark:bg-[#262E35] bg-white p-2">  
        <div className="w-8 h-8 rounded-full bg-[#7269EF] flex items-center justify-center">  
          <span className="text-white font-bold">L</span>  
        </div>  
        <span className="text-sm font-semibold dark:text-white text-gray-700">  
          Leen  
        </span>  
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>  
      </div>  

      <div className="flex flex-col p-4 overflow-y-auto flex-1">  
        {messages  
          .slice()  
          .sort((a, b) => parseTime(a.time) - parseTime(b.time))  
          .map((message) => (  
            <div  
              key={message.id}  
              className={`flex items-start m-2 ${  
                message.from === "Leen" ? "justify-end" : "justify-start"  
              }`}  
            >  
              {message.from === "Doris Brown" && (  
                <div className="mr-2 w-8 h-8 rounded-full bg-[#7269EF] flex items-center justify-center">  
                  <span className="text-white font-bold">D</span>  
                </div>  
              )}  
              <div  
                className={`p-3 rounded-lg shadow ${  
                  message.from === "Doris Brown"  
                    ? "bg-[#7269EF] text-white max-w-[70%]"  
                    : "bg-gray-200 text-gray-900 max-w-[70%]"  
                }`}  
              >  
                <div className="flex flex-col">  
                  <div className="flex items-center justify-between">  
                    <strong>{message.from}</strong>  
                  </div>  
                  <div>{message.text}</div>  
                  <div className="text-xs text-gray-300">{message.time}</div>  
                </div>  
              </div>  
              {message.from === "Leen" && (  
                <div className="ml-2 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">  
                  <span className="text-gray-900 font-bold">L</span>  
                </div>  
              )}  
            </div>  
          ))}  
        <div ref={messagesEndRef} />  
      </div>  

      <div className="flex items-center mt-4 p-2 border-t border-gray-300">  
        <input  
          type="text"  
          value={inputValue}  
          onChange={(e) => setInputValue(e.target.value)}  
          onKeyDown={(e) => {  
            if (e.key === "Enter") {  
              handleSendMessage();  
            }  
          }}  
          placeholder="Type a message..."  
          className=" dark:bg-[#303841] flex-1 border rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7269EF]"  
        />  
        <button  
          onClick={handleSendMessage}  
          className="ml-2 bg-[#7269EF] text-white rounded-lg px-4 py-2 disabled:opacity-50"  
          disabled={!inputValue.trim()}  
        >  
          <RiSendPlane2Fill />  
        </button>  
      </div>  
    </div>  
  );  
};  

export default Chat;