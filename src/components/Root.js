import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
const Root = () => {
  useEffect(() => {}, []);
  return (
    <div className="flex">
      <div>
        <Sidebar />
      </div>
      <div className="grid grid-cols-7 h-screen w-full">
        <div className="col-span-2 dark:text-white dark:bg-[#303841] bg-[#F5F7FB] ">
          <Outlet />
        </div>

        <div className="col-span-5 bg-gray-200">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Root;
