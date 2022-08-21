import express from "express";

import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  updateRoomUnavailablity,
} from "../controllers/room.js";

import { authorisedRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/rooms/:hotelId",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  createRoom
);

router.put(
  "/rooms/:roomId",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  updateRoom
);
router.put(
  "/rooms/unavailablityDates/:roomNumbersId",
  isAuthenticatedUser,
  updateRoomUnavailablity
);

router.get("/rooms/:roomId", getSingleRoom);
router.get("/rooms", getAllRooms);

router.delete(
  "/rooms/:roomId/:hotelId",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  deleteRoom
);
export default router;
