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
  }, [isDataFetched, currentUser]);
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
        body: JSON.stringify({ phone: currentUser.phone }),
      });

      if (response.ok) {
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
  return isLoading ? (
    <Loading />
  ) : (
    currentUser && (
      <div className="flex gap-3 dark:bg-[#303841]">
        <div className="w-20	">
          <Sidebar handleLogout={handleLogout} />
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
