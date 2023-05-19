import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const roomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    instructor: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
