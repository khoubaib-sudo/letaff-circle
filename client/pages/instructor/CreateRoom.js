
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
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

      console.log("Created room: ", response.data);
      console.log("Redirecting to room: /rooms/" + response.data.name);

      // Redirect the user to the new room page on your website
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="flex flex-col justify-between items-center bg-gradient-to-br from-purple-600 to-purple-200 rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit}>
          <label>
            Room Name:
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value.replace(/\s/g, '_'))}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <button type="submit">Create Room</button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
