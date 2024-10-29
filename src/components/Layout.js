import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Loading from "./Loading";
import Login from "./Login";
const Layout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoadind] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (!isDataFetched) {
      fetchProtectedResource();
    }
    setTimeout(() => {
      console.log(userData);
      setIsLoadind(false);
    }, 2000);
  }, []);
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

      setUserData(data);
      setIsDataFetched(true);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    userData && (
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
    )
  );
};

export default Layout;
