import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IoMoon,
  IoPersonOutline,
  IoSunny,
  IoSettingsOutline,
} from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { TiContacts } from "react-icons/ti";

const NAV_ITEMS = [
  { to: "/", icon: <IoPersonOutline />, ariaLabel: "Profile" },
  { to: "/chats", icon: <FaRegMessage />, ariaLabel: "Chats" },
  { to: "/contacts", icon: <TiContacts />, ariaLabel: "Contacts" },
  { to: "/settings", icon: <IoSettingsOutline />, ariaLabel: "Settings" },
];

const Sidebar = () => {
  const [dark, setDark] = useState(false);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const navLinkClass =
    "block text-2xl p-4 rounded transition duration-300 ease-in-out text-gray-600 text-center " +
    "dark:text-[#d9d6fbcc] dark:hover:bg-[#3C445A] dark:hover:text-[#4C57E0] " +
    "hover:bg-[#F1F0FD] hover:text-[#8C85F2] hover:shadow-lg";

  return (
    <div className="items-center dark:bg-[#36404A] bg-white p-2 h-screen shadow-lg flex flex-col justify-between min-w-full">
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 rounded-full bg-[#7269EF]"></div>
      </div>

      <div>
        <ul className="space-y-4">
          {NAV_ITEMS.map(({ to, icon, ariaLabel }) => (
            <li key={to}>
              <Link to={to} className={navLinkClass} aria-label={ariaLabel}>
                {icon}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="space-y-4">
          <li className="text-2xl p-4">
            <button onClick={darkModeHandler}>
              {dark ? <IoSunny className="text-white" /> : <IoMoon />}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
