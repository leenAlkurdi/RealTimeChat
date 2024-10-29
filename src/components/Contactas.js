import React from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

const Contacts = () => {
  const contacts = [
    { id: 1, name: "Albert Rodarte" },
    { id: 2, name: "Allison Etter" },
  ];
  const contactsC = [{ id: 3, name: "Craig Smiley" }];
  const contactsD = [
    { id: 3, name: "Daniel clay" },
    { id: 4, name: "Doris brown" },
  ];

  return (
    <div className="p-4 bg-gray-100 dark:bg-[#303841] rounded-lg shadow-md w-full h-screen ">
      <div className=" items-center mb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="ml-10 mt-5 text-2xl font-semibold">Contacts</h1>
          <button
            type="button"
            className="p-2  text-white "
          >
            <IoMdPersonAdd className="text-black dark:text-white" />
          </button>
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
      <div className="ml-10 mt-10 ">
        <p className="text-lg text-[#8b5cf6]">A</p>
      </div>
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="flex justify-between items-center p-2 border-b border-gray-300  hover:bg-gray-200 dark:hover:bg-[#374151] cursor-pointer"
          >
            <span className="font-medium">{contact.name}</span>
            <button className="p-2 rounded-md  text-black dark:text-white  focus:outline-none focus:ring-2 ">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="ml-10 mt-10 ">
        <p className="text-lg text-[#8b5cf6]">C</p>
      </div>
      <ul>
        {contactsC.map((contact) => (
          <li
            key={contact.id}
            className="flex justify-between items-center p-2 border-b border-gray-300  hover:bg-gray-200 dark:hover:bg-[#374151] cursor-pointer"
          >
            <span className="font-medium">{contact.name}</span>
            <button className="p-2 rounded-md  text-black dark:text-white   focus:outline-none focus:ring-2 ">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <div className="ml-10 mt-10 ">
        <p className="text-lg text-[#8b5cf6]">D</p>
      </div>
      <ul>
        {contactsD.map((contact) => (
          <li
            key={contact.id}
            className="flex justify-between items-center p-2 border-b border-gray-300  hover:bg-gray-200 dark:hover:bg-[#374151] cursor-pointer"
          >
            <span className="font-medium">{contact.name}</span>
            <button className="p-2 rounded-md  text-black  dark:text-white  focus:outline-none focus:ring-2 ">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
