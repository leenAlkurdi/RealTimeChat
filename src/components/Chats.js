import React from "react";
import { FaSearch } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import OnlineCard from "./OnlineCard";
import MsgCard from "./MsgCard";

const userData = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "Alice" },
  { id: 5, name: "Bob" },
  { id: 6, name: "Charlie" },
];

const recentMessages = [
  { id: 1, user: "Alice", message: "Hey there!", time: "10:12 AM" },
  {
    id: 2,
    user: "Bob",
    message: "Are you coming to the party tonight?",
    time: "10:15 AM",
  },
  {
    id: 3,
    user: "Charlie",
    message: "Let's meet up at the cafe.",
    time: "10:20 AM",
  },
  { id: 4, user: "Alice", message: "How about now?", time: "10:25 AM" },
  {
    id: 5,
    user: "Bob",
    message: "I'm on my way! Can't wait to see you all!",
    time: "10:30 AM",
  },
  {
    id: 6,
    user: "Charlie",
    message: "See you soon! Looking forward to it.",
    time: "10:35 AM",
  },
  {
    id: 7,
    user: "Alice",
    message: "Thanks for the reminder!",
    time: "10:40 AM",
  },
  { id: 8, user: "Bob", message: "Okay! See you!", time: "10:45 AM" },
  {
    id: 9,
    user: "Charlie",
    message: "Looking forward to it.",
    time: "10:50 AM",
  },
  { id: 10, user: "Alice", message: "Hey there!", time: "10:12 AM" },
  {
    id: 12,
    user: "Bob",
    message: "Are you coming to the party tonight?",
    time: "10:15 AM",
  },
  {
    id: 13,
    user: "Charlie",
    message: "Let's meet up at the cafe.",
    time: "10:20 AM",
  },
  { id: 14, user: "Alice", message: "How about now?", time: "10:25 AM" },
  {
    id: 15,
    user: "Bob",
    message: "I'm on my way! Can't wait to see you all!",
    time: "10:30 AM",
  },
  {
    id: 16,
    user: "Charlie",
    message: "See you soon! Looking forward to it.",
    time: "10:35 AM",
  },
  {
    id: 17,
    user: "Alice",
    message: "Thanks for the reminder!",
    time: "10:40 AM",
  },
  { id: 18, user: "Bob", message: "Okay! See you!", time: "10:45 AM" },
  {
    id: 19,
    user: "Charlie",
    message: "Looking forward to it.",
    time: "10:50 AM",
  },
];

const Chats = () => {
  return (
    <div className="h-screen dark:bg-[#303841] bg-[#F5F7FB] p-5">
      <div className=" items-center mb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="ml-10 mt-5 text-2xl font-semibold">Chats</h1>
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

      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={4}
          breakpoints={{
            200: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            2000: {
              slidesPerView: 5,
            },
          }}
          grabCursor={true}
          style={{ cursor: "grab" }}
          className="my-4"
        >
          {userData.map((user) => (
            <SwiperSlide key={user.id} className=" flex justify-center">
              <OnlineCard user={user.name} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h1 className="font-semibold text-lg mt-4">Recent</h1>
      <div className="overflow-y-scroll h-3/5">
        {recentMessages.map((message, i) => (
          <MsgCard key={i} message={message} />
        ))}
      </div>
    </div>
  );
};

export default Chats;
