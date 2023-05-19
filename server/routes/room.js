import express from "express";
import { requireSignin } from "../middlewares";
import { createRoom, getInstructorRooms, getAllRooms } from "../controllers/room";

const router = express.Router();

router.post("/postroom", requireSignin, createRoom);
router.get("/getroom", requireSignin, getAllRooms);
router.get("/room/instructor", requireSignin, getInstructorRooms);

module.exports = router;
