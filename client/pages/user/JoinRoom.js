import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { CiStreamOn } from "react-icons/ci";
import { motion } from "framer-motion";

const JoinRoom = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/getroom", { // change this to your server endpoint
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAILY_API_KEY}`,
          },
        });
        console.log(response.data.data); 
        setRooms(response.data.data);
        setRooms(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, []);
  const calculateTimeElapsed = (updatedAt) => {
    const updated = new Date(updatedAt);
    const now = new Date();
    
    let elapsed = now - updated;
  
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
  
    return ` ${hours}h ${minutes}m ${seconds}s`;
  };

  const handleJoin = (roomUrl) => {
    router.push(roomUrl);
  };
  
  return (
    <div className="container mx-auto my-4">
      <motion.div
        className="flex flex-col justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center items-center">
          <h1 className="text-4xl md:text-7xl capitalize font-semibold">
            Available&nbsp;
            <span className="text-white capitalize animate-pulse flex items-center">
              Rooms
              <CiStreamOn className="ml-2" />{" "}
            </span>
          </h1>
        </div>
        <motion.div
          className="ag-format-container mx-auto my-4 flex flex-wrap justify-center items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {rooms.map((room, index) => (
            <motion.div
              key={index}
              className="ag-courses_item m-2 flex flex-col bg-purple-900 rounded-lg shadow-lg overflow-hidden hover:bg-purple-600 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="ag-courses-item_link relative p-5">
                <div className="ag-courses-item_bg absolute top-0 right-0 w-32 h-32 bg-purple-600 rounded-full transform translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"></div>
                <div className="z-10 relative">
                  <motion.h2
                    className="ag-courses-item_title text-white font-bold text-3xl mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {room.roomName}
                  </motion.h2>
                  <motion.h2
                    className="ag-courses-item_title text-white  mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {room.description} 
                  </motion.h2>
                  <motion.div
                    className="ag-courses-item_date-box text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    
                    <span className="ag-courses-item_date text-slate-400 font-bold ml-1">
                    {calculateTimeElapsed(room.updatedAt)}
                    </span>
                  </motion.div>
                  <motion.button
                    className="mt-4 bg-white py-2 px-4 rounded-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    onClick={() => handleJoin(room.url)}
                  >
                    Join Room
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JoinRoom;
