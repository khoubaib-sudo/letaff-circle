import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Card, Select, Button } from "antd";

const JoinRoom = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("https://api.daily.co/v1/rooms", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAILY_API_KEY}`,
          },
        });

        setRooms(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRooms();
  }, []);

  const handleJoin = (roomName) => {
    // Redirect to the selected room's URL
    router.push("https://khoubaib.daily.co/" + roomName);
  };

  return (
    <div className="container mx-auto my-4">
      <div className="flex flex-col justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl md:text-7xl capitalize font-semibold ">
            Available&nbsp;
            <span className="text-white capitalize animate-pulse">Rooms</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room, index) => (
            <div key={index} className="bg-purple-200 rounded-xl">
              <Card className="flex flex-col p-8 rounded-xl bg-white shadow-xl transform translate-x-4 translate-y-4 w-96 md:w-auto">
                <div className="mt-3 font-semibold text-lg">{room.name}</div>

                <Button
                  className="bg-purple-600  rounded-full shadow-xl mt-4"
                  onClick={() => handleJoin(room.name)}
                >
                  Join Room
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
