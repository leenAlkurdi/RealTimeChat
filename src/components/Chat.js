import React, { useState, useEffect, useRef } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useUserInfo } from "../userContext";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});
const Chat = () => {
  const { currentUser } = useUserInfo();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [contact, setContact] = useState(null);
  const { phone } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  useEffect(() => {
    console.log("Chat useEffect");
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    socket.emit("joinChat", { from: currentUser.phone, to: phone });
    const handleMessage = ({ from, to, message }) => {
      console.log(
        `Received message from: ${from}, to: ${to}, message: ${message.message}`
      );

      if (from === phone && to === currentUser.phone) {
        console.log("Message received:", message);
        setMessages((prev) => [
          ...prev,
          {
            from,
            to,
            message: message.message,
            time: message.time,
          },
        ]);
        console.log(messages);
      }
    };
    socket.on("receiveMessage", handleMessage);
    return () => {
      socket.off("receiveMessage", handleMessage);
      socket.emit("leaveChat", { from: currentUser.phone, to: phone });
    };
  }, [currentUser, phone]);
  useEffect(() => {
    console.log("Room useEffect");
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/messages/${currentUser.phone}/${phone}`
        );
        const data = await response.json();
        const sortedMsgs = data.messages.sort(
          (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
        );
        setContact(data["user"]);
        setMessages(sortedMsgs);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchMessages();
    return () => {};
  }, [currentUser, phone, navigate]);

  const handleSendMessage = async () => {
    if (currentUser.phone && phone && message) {
      try {
        const response = await fetch(
          `http://localhost:4000/message-send/${currentUser.phone}/${phone}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message }),
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          alert(`Error: ${errorResponse.error}`);
        } else {
          const msg = {
            from: currentUser.phone,
            to: phone,
            message: message,
            time: new Date().toISOString(),
          };

          socket.emit("sendMessage", {
            from: currentUser.phone,
            to: phone,
            message: msg,
          });
          setMessages((prev) => [...prev, msg]);
          setMessage("");
        }
      } catch (err) {
        console.error("error", err.message);
      }
    } else {
      alert("Invalid fields");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  const currentTime = () => {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";

    return `${hours}:${minutes}: ${ampm}`;
  };
  return (
    <div className="h-screen dark:bg-[#262E35] bg-white flex flex-col pb-4">
      <div className="flex items-center sticky top-0 z-10 space-x-2 border-b border-gray-300 dark:bg-[#262E35] bg-white p-2">
        <div className="w-8 h-8   rounded-full bg-[#7269EF] flex items-center justify-center relative ">
          <img
            src={
              contact?.avatar
                ? `http://localhost:4000/static/${contact?.avatar}`
                : "default.webp"
            }
            alt="img"
            className=" h-full rounded-full max-w-none"
          />
        </div>
        <span className="text-sm font-semibold dark:text-white text-gray-700">
          {contact?.name}
        </span>
      </div>

      <div className="flex flex-col p-4 overflow-y-auto flex-1">
        {messages.map((message, i) => (
          <div
            key={i}
            className={`flex items-start m-2 gap-1 ${
              message["from"] === currentUser["phone"]
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message["from"] === contact["phone"] && (
              <div className="w-8 h-8   rounded-full bg-[#7269EF] flex items-center justify-center relative ">
                <img
                  src={
                    contact?.avatar
                      ? `http://localhost:4000/static/${contact?.avatar}`
                      : "default.webp"
                  }
                  alt="img"
                  className=" h-full rounded-full max-w-none"
                />
              </div>
            )}
            <div
              className={` p-3 rounded-lg shadow w-2/4  max-w-3/4 ${
                message["from"] === contact["phone"]
                  ? "bg-[#7269EF] text-white "
                  : "bg-gray-200 text-gray-900 "
              }`}
            >
              <div className="flex flex-col">
                <div>{message["message"]}</div>
                <div
                  className={`text-xs  ${
                    message["from"] === contact["phone"]
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {currentTime(message.time)}
                </div>
              </div>
            </div>
            {message["from"] === currentUser["phone"] && (
              <div className="w-8 h-8   rounded-full bg-[#7269EF] flex items-center justify-center relative ">
                <img
                  src={
                    currentUser?.avatar
                      ? `http://localhost:4000/static/${currentUser?.avatar}`
                      : "default.webp"
                  }
                  alt="img"
                  className=" h-full rounded-full max-w-none"
                />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-4 p-2 border-t border-gray-300">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className=" dark:bg-[#303841] flex-1 border rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#7269EF]"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-[#7269EF] text-white rounded-lg px-4 py-2 disabled:opacity-50"
        >
          <RiSendPlane2Fill />
        </button>
      </div>
    </div>
  );
};

export default Chat;
