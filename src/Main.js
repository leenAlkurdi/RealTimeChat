import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
// import Chats from "./components/Chats";
// import Contactas from "./components/Contactas";

// import Settings from "./components/Settings";
// import Login from "./components/Login";
// import Register from "./components/Register";

const Main = () => {
  return (
    <div className="flex">
      <div>{/* <Sidebar /> */}</div>
      <div className="grid grid-cols-7 h-screen w-full">
        <div className="col-span-2 dark:text-white dark:bg-[#303841] bg-[#F5F7FB] ">
          {/* <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/contacts" element={<Contactas />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes> */}
        </div>

        <div className="col-span-5 bg-gray-200">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Main;
