import React, { useState } from "react";
import { useUserInfo } from "../userContext";

function Profile() {
  const [isAboutOpen, setIsAboutOpen] = useState(true);

  const toggleAbout = () => setIsAboutOpen(!isAboutOpen);
  const { currentUser } = useUserInfo();
  return (
    <div className="p-4 bg-[#F5F7FB] dark:bg-[#303841]  rounded-lg shadow-md  h-screen w-1/4		">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-gray-600 rounded-full"></div>
        <h2 className="mt-4 text-lg font-semibold">{currentUser.name}</h2>
        <span className="text-[#7269EF] text-sm mb-12">Active</span>
      </div>
      <hr />

      <p className="mt-4 text-center dark:text-white text-gray-600 text-sm mb-12">
        If several languages coalesce, the grammar of the resulting language is
        more simple and regular than that of the individual.
      </p>
      <hr />

      <div className="mt-12">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={toggleAbout}
        >
          <span className="text-gray-700 dark:text-white font-medium">
            About
          </span>
          <span>{isAboutOpen ? "▲" : "▼"}</span>
        </div>

        {isAboutOpen && (
          <div className="mt-2 text-sm text-gray-600 space-y-1">
            <div className="dark:text-white">
              <p className="font-semibold dark:text-white">Name: </p> Ghazal
              Kaadan
            </div>
            <div className="dark:text-white">
              <p className="font-semibold dark:text-white">Phone number: </p>{" "}
              {currentUser.phone}
            </div>
            <div className="dark:text-white">
              <p className="font-semibold dark:text-white">Time: </p> 11:40 AM
            </div>
            <div className="dark:text-white">
              <p className="font-semibold dark:text-white">Location: </p>{" "}
              Damascus, Syria
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
