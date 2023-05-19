import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Input, Button, Form } from "antd";
import { motion } from "framer-motion";
import { MdMeetingRoom } from "react-icons/md";
const { TextArea } = Input;

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First create the room using the Daily.co API
      const dailyResponse = await axios.post(
        "https://api.daily.co/v1/rooms",
        {
          name: roomName,
          properties: {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours from now
            enable_chat: true,
            start_video_off: false,
            start_audio_off: false,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAILY_API_KEY}`,
          },
        }
      );

      // Then, save the room details in your own database
      const response = await axios.post(
        "/api/postroom", // change this to your server endpoint
        {
          roomName: roomName,
          description: description,
          url: dailyResponse.data.url, // add the room URL here
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // After room creation, redirect to the instructor rooms list or a new page showing the room was created successfully.
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center">
      <div
        className="absolute left-0 transform -rotate-90 flex items-center justify-center"
        style={{
          top: "50%",
          transform: "translateY(-100%) translateX(100%) rotate(-90deg)",
        }}
      >
        <span className="text-gray-50 text-xl">Powered by </span>
        <img
          src="/assets/daily-logo.png"
          alt="Daily logo"
          className="h-6 ml-2"
        />
      </div>
      <motion.div
        className="flex flex-col justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "1600px" }} // Fixing the width of the main div
      >
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-2/3 md:mr-6">
            <h1 className="text-4xl md:text-7xl capitalize font-semibold">
              Create&nbsp;
              <span className="text-white capitalize animate-pulse flex items-center">
                A Room
                <MdMeetingRoom className="ml-2" />{" "}
              </span>
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  for="roomName"
                  className="block text-sm font-medium mb-2 text-white"
                >
                  Room Name:
                </label>
                <input
                  id="roomName"
                  type="text"
                  value={roomName}
                  onChange={(e) =>
                    setRoomName(e.target.value.replace(/\s/g, "_"))
                  }
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500   w-80 sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label
                  for="description"
                  className="block text-sm text-white font-medium mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500  w-80 sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <p className="text-gray-100 text-sm mb-4 font-style: italic">
                Note: You will be redirected to daily.co
              </p>

              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-purple-600 bg-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
              >
                Create Room
              </button>
            </form>
          </div>
          <div className="md:w-1/3 md:ml-6">
            <img
              src="/assets/hero5.png"
              alt="Create Room"
              className="mt-4 mx-auto md:ml-8 md:mt-0 md:max-w-none animate-float"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateRoom;
