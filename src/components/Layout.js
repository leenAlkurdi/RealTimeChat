import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import { useUserInfo } from "../userContext";
import { io } from "socket.io-client";
import Alert from "./Alert";
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});
const Layout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoadind] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [sender, setSender] = useState(null);
  const [alert, setAlert] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const { currentUser, setCurrentUser } = useUserInfo();

  useEffect(() => {
    setCurrentRoom(null);
    socket.on("connection", () => {
      console.log("connection WebSocket");
    });
    socket.on("disconnect", (number) => {
      console.log("disconnect WebSocket", number);
    });
    socket.on("newMessageNotification", ({ from, to, message, roomId }) => {
      console.log("Received new message notification:");
      if (roomId !== currentRoom) {
        if (currentUser["phone"] === to) {
          setAlert(true);
          setSender({ from, message });

          // alert(`New message from ${from}: ${message.message}`);
        }
      } else {
        console.log("Message received in current room.");
      }
    });

    if (!isDataFetched) {
      fetchProtectedResource();
    }
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }

    setTimeout(() => {
      setIsLoadind(false);
    }, 2000);
    const handleUserConnected = (newUser) => {
      setConnectedUsers((prevUsers) => [...prevUsers, newUser]);
    };

    const handleUserDisconnected = (disconnectedUser) => {
      console.log("disconnectedUser");
      setConnectedUsers((prevUsers) =>
        prevUsers.filter((user) => user !== disconnectedUser)
      );
    };

    socket.on("userConnected", handleUserConnected);
    socket.on("userDisconnected", handleUserDisconnected);
    return () => {
      socket.off("newMessageNotification");
      socket.off("disconnect");
      socket.off("userConnected", handleUserConnected);
      socket.off("userDisconnected", handleUserDisconnected);
    };
  }, [isDataFetched, currentUser, navigate, sender]);

  async function fetchProtectedResource() {
    setIsLoadind(true);
    try {
      const response = await fetch("http://localhost:4000/", {
        method: "GET",
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        navigate("/login");
        setIsLoadind(false);
      }
      const data = await response.json();
      setCurrentUser(data);
      setIsDataFetched(true);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: currentUser["phone"] }),
      });

      if (response.ok) {
        socket.emit("logout", currentUser["phone"]);
        // socket.emit("userDisconnected", currentUser["phone"]);
        // socket.emit("disconnect");

        navigate("/login");
      } else {
        console.error("Logout failed");
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const closeAlert = () => {
    setAlert(false);
  };

  return isLoading ? (
    <Loading />
  ) : (
    currentUser && (
      <div className="flex gap-3 dark:bg-[#303841] relative">
        {alert && (
          <Alert
            from={sender["from"]}
            message={sender["message"]["message"]}
            closeAlert={closeAlert}
          />
        )}

        <div className="w-20	">
          <Sidebar handleLogout={handleLogout} />
        </div>
        <div className="dark:text-white dark:bg-[#303841] bg-[#F5F7FB] h-screen w-11/12	">
          <Outlet />
        </div>
      </div>
    )
  );
};

export default Layout;
