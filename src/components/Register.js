import React, { useEffect, useState } from "react";  
import { useNavigate, Link } from "react-router-dom";   
import { FiPhone } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

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
    <>  
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-black text-center">  
        Sign up  
      </h1>  
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">  
        <div className="mt-7 bg-white border w-1/2 justify-center border-gray-200 rounded-xl shadow-sm dark:bg-neutral-00 dark:border-neutral-200">  
          <div className="p-4 sm:p-7">  
            <div className="text-center"></div>  
            <div className="mt-5 justify-center">  
              <form  
                id="uploadForm"  
                onSubmit={handleSubmit}  
                encType="multipart/form-data"  
              >  
                <div className="grid gap-y-4">  
                  <div>  
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
                  </div>  

                  <div>  
                    <label  
                      htmlFor="phonenumber"  
                      className="block text-sm mb-2 dark:text-black absolute ml-5"  
                    >  
                      Phone number  
                    </label>  
                    <FiPhone />
           
                    <input  
                      type="tel"  
                      id="phonenumber"  
                      name="phone"  
                      className="peer py-3 pe-0 ps-8 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 text-sm focus:border-b-[#8b5cf6] dark:border-b-neutral-200 focus:ring-none focus:outline-none dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 dark:focus:border-b-[#8b5cf6]"  
                      required  
                      placeholder="Enter Number"  
                    />  
                  </div>  
                       
                 
                  <div>  
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
                      className ="block w-full text-sm text-gray-500   
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

              <div className="mt-4 text-center">  
                <p className="text-sm text-gray-600 dark:text-gray-400">  
                  Already have an account?{" "}  
                  <Link to="/login" className="text-violet-500 font-semibold">  
                    Log in here  
                  </Link>  
                </p>  
              </div>  
            </div>  
          </div>  
        </div>  
      </div>  
      </div>
    </>  
  );  
};  

export default Register;