import express from "express"
import * as hotelCtrler from "../controllers/hotels.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router = express.Router()

router.post("/", verifyAdmin, hotelCtrler.createHotel)
router.put("/:id", verifyAdmin, hotelCtrler.updateHotel)
router.delete("/:id", verifyAdmin, hotelCtrler.deleteHotel)
router.get("/find/:id", hotelCtrler.getHotel)
router.get("/", hotelCtrler.getHotels)
router.get("/countByCity", hotelCtrler.countByCity)
router.get("/countByType", hotelCtrler.countByType)
router.get("/:id", hotelCtrler.getHotel)
router.get("/room/:id", hotelCtrler.getHotelRooms)

export default router
