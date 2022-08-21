import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getAllHotelsByCategory,
  getAllHotelsByCities,
  getSingleHotel,
  updateHotel,
} from "../controllers/hotel.js";

import { authorisedRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/hotels/new",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  createHotel
);

router.put(
  "/hotels/:hotelId",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  updateHotel
);

router.get("/hotels/:hotelId", isAuthenticatedUser, getSingleHotel);
router.get("/hotels", getAllHotels);
router.get("/hotels/find/byCities", getAllHotelsByCities);
router.get("/hotels/find/byCategory", getAllHotelsByCategory);


router.delete(
  "/hotels/:hotelId",
  isAuthenticatedUser,
  authorisedRoles(["admin"]),
  deleteHotel
);
export default router;
