import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";

const Register = () => {
  const [isLoading, setIsLoadind] = useState(true);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoadind(true);

    const formData = new FormData(document.getElementById("uploadForm"));

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (res.ok) {
        setIsLoadind(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoadind(false);
    }, 1000);

    return () => {};
  }, []);

  return (
    isLoading && (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-8 text-center"> Sign up</h1>
          <form
            id="uploadForm"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6"
          >
            <div className="grid gap-y-4">
              <div className="relative">
                <input
                  type="text"
                  className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-b-[#8b5cf6] dark:border-b-neutral-700 focus:ring-none focus:outline-none dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
                  placeholder="Enter Name"
                  name="name"
                  required
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg
                    className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
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
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              {/* <div>
          <label
            htmlFor="username"
            className="block text-sm mb-2 dark:text-black absolute ml-5"
          >
            User name
          </label>
          <FaRegUser />
          <input
            type="text"
            id="username"
            name="name"
            className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-b-[#8b5cf6] dark:border-b-neutral-200 focus:ring-none focus:outline-none dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-[#8b5cf6]"
            required
            placeholder="Enter User name"
          />
        </div> */}
              <div className="relative">
                <input
                  type="tel"
                  className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-b-[#8b5cf6] dark:border-b-neutral-700 focus:ring-none focus:outline-none dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
                  placeholder="Enter Phone"
                  name="phone"
                  required
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <FiPhone className="shrink-0 size-4 text-gray-500 dark:text-neutral-500" />
                </div>
              </div>
              {/* <div>
          <label
            htmlFor="phonenumber"
            className="block text-sm mb-2 dark:text-black absolute ml-5"
          >
            Phone number
          </label>
          

          <input
            type="tel"
            id="phonenumber"
            name="phone"
            className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-b-[#8b5cf6] dark:border-b-neutral-200 focus:ring-none focus:outline-none dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-[#8b5cf6]"
            required
            placeholder="Enter Number"
          />
        </div> */}

              {/* <div>
          <label
            htmlFor="password"
            className="block text-sm mb-2 dark:text-black absolute ml-5"
          >
            Password
          </label>
          <RiLockPasswordLine />
          <input
            type="password"
            id="password"
            name="password"
            className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-b-[#8b5cf6] dark:border-b-neutral-200 focus:ring-none focus:outline-none dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-[#8b5cf6]"
            required
            placeholder="Enter Password"
          />
        </div> */}
              <div className="relative">
                <input
                  type="password"
                  className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-b-[#8b5cf6] dark:border-b-neutral-700 focus:ring-none focus:outline-none dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-neutral-600"
                  placeholder="Enter password"
                  name="password"
                  required
                />
                <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-2 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                  <svg
                    className="shrink-0 size-4 text-gray-500 dark:text-neutral-500"
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
                    <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                    <circle cx="16.5" cy="7.5" r=".5"></circle>
                  </svg>
                </div>
              </div>
              <div>
                <label
                  htmlFor="photo"
                  className="block text-sm mb-2 dark:text-black"
                >
                  Upload Photo
                </label>
                <input
                  type="file"
                  id="photo"
                  name="myfile"
                  accept="image/*"
                  className="block w-full text-sm text-gray-500   
                file:mr-4 file:py-3 file:px-4   
                file:rounded-lg file:border-0   
                file:bg-violet-500 file:text-white   
                hover:file:bg-violet-600"
                />
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <button
                type="submit"
                className="bg-violet-500 text-white py-2 px-4 rounded w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    )
  );
};

export default Register;
