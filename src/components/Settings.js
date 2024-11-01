import React, { useState } from "react";
import { useUserInfo } from "../userContext";

const Setting = () => {
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(true);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const { currentUser } = useUserInfo();
  const handleSaveName = () => {
    setIsEditingName(false);
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
    <div className=" w-1/4 p-4 bg-[#F5F7FB] dark:bg-[#303841] dark:text-white rounded-lg shadow-md h-screen ">
      <h1 className="text-lg md:text-xl font-semibold text-gray-700 dark:text-white text-center md:text-left">
        Settings
      </h1>
      <div className="flex flex-col md:flex-row items-center mt-4 md:space-x-4">
        <div className="relative">
          <div className=" w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-600 overflow-hidden">
            <img
              src={
                currentUser?.avatar
                  ? `http://localhost:4000/static/${currentUser?.avatar}`
                  : "/static/media/default.6cd7e2271add27d8dce7.webp"
              }
              alt="img"
              className="w-full h-full"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-6 h-6 md:w-7 md:h-7 bg-[#7269EF] text-white rounded-full flex items-center justify-center text-xs cursor-pointer">
            ✎
          </span>
        </div>
        <div className="flex flex-col items-center md:items-start mt-4 md:mt-0">
          <h2 className="text-lg md:text-xl font-semibold">
            {currentUser.name}
          </h2>
          <span className="text-gray-500 text-sm md:text-base cursor-pointer dark:text-white">
            Available ▼
          </span>
        </div>
      </div>

      <div className="mt-6 ">
        <div
          className=" flex items-center justify-between cursor-pointer"
          onClick={() => setIsPersonalInfoOpen(!isPersonalInfoOpen)}
        >
          <span className="dark:text-white text-gray-700 font-medium">
            Personal Info
          </span>
          <span>{isPersonalInfoOpen ? "▲" : "▼"}</span>
        </div>

        {isPersonalInfoOpen && (
          <div className="dark:text-white mt-2 text-sm md:text-base text-gray-600 space-y-2 border-t pt-2">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex-1">
                <p className="font-semibold">Name: </p>
                {isEditingName ? (
                  <input
                    type="text"
                    value={currentUser.name}
                    // onChange={(e) => setName(e.target.value)}
                    className="border-b-2 border-gray-300 focus:border-[#7269EF] outline-none w-full md:w-auto"
                  />
                ) : (
                  <span>{currentUser.name}</span>
                )}
              </div>
              <button
                className="text-[#7269EF]  text-xs md:text-sm mt-2 md:mt-0"
                onClick={() => {
                  if (isEditingName) {
                    handleSaveName();
                  } else {
                    setIsEditingName(true);
                  }
                }}
              >
                {isEditingName ? "Save" : "Edit"}
              </button>
            </div>
            <div>
              <p className="font-semibold">Phone number: </p>{" "}
              {currentUser.phone}
            </div>
            <div>
              <p className="font-semibold">Time: </p> {currentTime()}
            </div>
            <div>
              <p className="font-semibold">Location: </p> Damascus, Syria
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}
        >
          <span className="dark:text-white text-gray-700 font-medium">
            Privacy
          </span>
          <span>{isPrivacyOpen ? "▲" : "▼"}</span>
        </div>

        {isPrivacyOpen && (
          <div className=" mt-2 text-sm md:text-base text-gray-600 border-t pt-2">
            <p className="dark:text-white">Privacy settings content...</p>
          </div>
        )}
      </div>

      <div className=" mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsSecurityOpen(!isSecurityOpen)}
        >
          <span className="dark:text-white text-gray-700 font-medium">
            Security
          </span>
          <span>{isSecurityOpen ? "▲" : "▼"}</span>
        </div>

        {isSecurityOpen && (
          <div className="mt-2 dark:text-white text-sm md:text-base text-gray-600 border-t pt-2">
            <p>Security settings content...</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsHelpOpen(!isHelpOpen)}
        >
          <span className="dark:text-white text-gray-700 font-medium">
            Help
          </span>
          <span>{isHelpOpen ? "▲" : "▼"}</span>
        </div>

        {isHelpOpen && (
          <div className="dark:text-white mt-2 text-sm md:text-base text-gray-600 border-t pt-2">
            <p>Help settings content...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
