import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { io } from "socket.io-client";
import { useUserInfo } from "../userContext";
import Alert from "./Alert";
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});
const Chats = () => {
  const navigate = useNavigate();
  const { currentUser } = useUserInfo();
  const [currentRoom, setCurrentRoom] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [sender, setSender] = useState(null);
  const [alert, setAlert] = useState(false);
  const enterRoom = (user) => {
    const roomId = `chat_${Math.min(currentUser.phone, user)}_${Math.max(
      currentUser.phone,
      user
    )}`;
    socket.emit("joinChat", roomId);
    setCurrentRoom(roomId);
    console.log(`Entering room: ${roomId}`);
    navigate(`${user.phone}`);
  };
  useEffect(() => {
    setCurrentRoom(null);

    console.log("currentUser.phone", currentUser.phone);
    socket.on("newMessageNotification", ({ from, to, message, roomId }) => {
      console.log("Received new message notification:");
      if (roomId !== currentRoom) {
        if (currentUser.phone === to) {
          setAlert(true);
          setSender({ from, message });
        }
      } else {
        console.log("Message received in current room.");
      }
    });
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
    console.log("ChatuseEffect");

    socket.on("disconnect", () => {
      console.log("disconnect WebSocket");
    });
    const fetchConnectedUsers = async () => {
      try {
        const response = await fetch("http://localhost:4000/connected-users", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        const realData = data.connectedUsers.filter(
          (ele) => ele["phone"] !== currentUser["phone"]
        );

        setConnectedUsers(realData);
      } catch (err) {
        console.error("fetchConnectedUsers", err.message);
      }
    };
    fetchConnectedUsers();
    const fetchChats = async () => {
      if (currentUser.phone) {
        try {
          const response = await fetch(
            `http://localhost:4000/messages/${currentUser.phone}`
          );
          const data = await response.json();

          setUserChats(
            data["chats"].filter((ele) => ele !== currentUser.phone)
          );
        } catch (err) {
          console.log(err.message);
        }
      }
    };

    fetchChats();
    const handleUserConnected = (newUser) => {
      setConnectedUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleUserDisconnected = (disconnectedUser) => {
      setConnectedUsers((prevUsers) =>
        prevUsers.filter((user) => user !== disconnectedUser)
      );
    };

    socket.on("userConnected", handleUserConnected);
    socket.on("userDisconnected", handleUserDisconnected);
    return () => {
      socket.off("newMessageNotification");
      socket.off("userConnected", handleUserConnected);
      socket.off("userDisconnected", handleUserDisconnected);
    };
  }, [currentRoom, currentUser, navigate, sender]);
  function convertDate(rawDate) {
    const date = new Date(rawDate);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${amPm}`;
  }
  const closeAlert = () => {
    setAlert(false);
  };
  return (
    <div className="max-h-screen dark:bg-[#303841] bg-[#F5F7FB] px-5 chatsContainer ">
      {alert && (
        <Alert
          from={sender["from"]}
          message={sender["message"]["message"]}
          closeAlert={closeAlert}
        />
      )}
      <div className="">
        <div className=" items-center mb-4 ">
          <div className="flex items-center justify-between mb-4">
            <h1 className="ml-10 mt-5 text-2xl font-semibold">Chats</h1>
          </div>

          <div className="max-w-sm space-y-3 ml-10 mt-5">
            <div className="relative">
              <input
                type="text"
                className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-b-[#8b5cf6] dark:border-b-neutral-200 focus:ring-none focus:outline-none dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-[#8b5cf6]"
                placeholder="Search by name"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            breakpoints={{
              200: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              2000: {
                slidesPerView: 5,
              },
            }}
            grabCursor={true}
            style={{ cursor: "grab" }}
            className="my-4"
          >
            {connectedUsers.length > 0 ? (
              [
                ...new Set(
                  connectedUsers?.filter(
                    (ele) => ele.phone !== currentUser.phone
                  )
                ),
              ].map((user, index) => (
                <>
                  <SwiperSlide
                    key={user?.id ? user?.id : index}
                    className=" flex justify-center"
                    onClick={() => enterRoom(user)}
                  >
                    <div className="relative flex flex-col items-center">
                      <div className="w-12 h-12  rounded-full bg-[#7269EF] flex items-center justify-center relative">
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <span className="text-center text-sm dark:text-white text-gray-700">
                        {user["name"]}
                      </span>
                    </div>
                  </SwiperSlide>
                </>
              ))
            ) : (
              <SwiperSlide className=" flex justify-center">
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12  rounded-full bg-[#7269EF] flex items-center justify-center relative ">
                    <img
                      src="default.webp"
                      alt="img"
                      className="w-full h-full rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-700 border-2 border-white rounded-full"></span>
                  </div>
                  <span className="text-center text-sm dark:text-white text-gray-700">
                    None
                  </span>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>

        <h1 className="font-semibold text-lg mt-4">Messages</h1>
        <div className="overflow-y-auto chats">
          {userChats.map((chat) => (
            <Link key={chat?.id ? chat?.id : chat.phone} to={`${chat.phone}`}>
              <div
                key={chat?.id ? chat?.id : chat.phone}
                className="flex items-center p-2  hover:bg-gray-200 dark:hover:bg-[#374151] transition-colors duration-200"
              >
                <div className="w-8 h-8   rounded-full bg-[#7269EF] flex items-center justify-center relative ">
                  <img
                    src={
                      chat?.avatar
                        ? `http://localhost:4000/static/${chat?.avatar}`
                        : "default.webp"
                    }
                    alt="img"
                    className=" h-full rounded-full max-w-none"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="ml-3 flex justify-between items-center w-full whitespace-nowrap overflow-hidden">
                  <div className="flex-1 mr-2 overflow-ellipsis overflow-hidden">
                    <div className="font-semibold">{chat.name}</div>
                    <div className="text-sm dark:text-[#A7A9B6] text-gray-600 overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {/* {chat.messages.reduce((latest, current) =>
                        new Date(current.time) > new Date(latest.time)
                          ? current
                          : latest
                      )} */}
                      {
                        chat.messages.reduce((latest, current) =>
                          new Date(current.time) > new Date(latest.time)
                            ? current
                            : latest
                        )["message"]
                      }
                    </div>
                  </div>
                  <div className="flex text-xs text-gray-400">
                    {convertDate(
                      chat.messages.reduce((latest, current) =>
                        new Date(current.time) > new Date(latest.time)
                          ? current
                          : latest
                      )["time"]
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Chats;
