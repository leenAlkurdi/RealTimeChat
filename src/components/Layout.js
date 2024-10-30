import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import { useUserInfo } from "../userContext";
const Layout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoadind] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false);
  // const [userData, setUserData] = useState(null);
  const { currentUser, setCurrentUser } = useUserInfo();
  useEffect(() => {
    if (!isDataFetched) {
      fetchProtectedResource();
    }
    setTimeout(() => {
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

      // setUserData(data);
      setCurrentUser(data);
      setIsDataFetched(true);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }

  return isLoading ? (
    <Loading />
  ) : (
    currentUser && (
      <div className="flex gap-3 dark:bg-[#303841]">
        <div className="w-20	">
          <Sidebar />
        </div>
        <div className="dark:text-white dark:bg-[#303841] bg-[#F5F7FB] h-screen w-11/12	">
          <Outlet />
          {/* <div className="  ">
          </div>

          <div className="col-span-5 bg-gray-200">
            <Chat />
          </div> */}
        </div>
      </div>
    )
  );
};

export default Layout;
