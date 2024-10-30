import React from "react";
const Alert = ({ from, message, closeAlert }) => {
  return (
    <div
      className="max-w-xs  bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-[#303841] dark:border-neutral-700 absolute right-10 top-10 "
      aria-labelledby="hs-toast-avatar-label"
    >
      <div className="flex p-4">
        <div className="shrink-0">
          <button
            type="button"
            className="absolute top-4 end-2 inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white"
            aria-label="Close"
            onClick={closeAlert}
          >
            <span className="sr-only">Close</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div className="ms-4 me-8">
          <h3
            id="hs-toast-avatar-label"
            className="text-gray-800 font-medium text-sm dark:text-white"
          >
            <span className="font-semibold">A new Message </span>
            From: {from}
          </h3>
          <div className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
