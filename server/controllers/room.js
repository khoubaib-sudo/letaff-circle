import Room from "../models/room";

// Function to create a room
export const createRoom = async (req, res) => {
  const { roomName, url, description } = req.body;
  const room = await new Room({ roomName, url, description, instructor: req.user._id }).save();
  res.json(room);
};

// Function to get rooms created by an instructor
export const getInstructorRooms = async (req, res) => {
  const rooms = await Room.find({ instructor: req.user._id }).exec();
  res.json(rooms);
};

// Function to get all rooms for students
export const getAllRooms = async (req, res) => {
  const rooms = await Room.find({}).exec();
  res.json(rooms);
};
