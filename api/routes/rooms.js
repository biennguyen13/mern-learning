import express from "express"
import * as roomCtrler from "../controllers/rooms.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()


router.post("/:hotelId", verifyUser, roomCtrler.createRoom)
router.put("/:id", verifyAdmin, roomCtrler.updateRoom)
router.delete("/:id/:hotelId", verifyAdmin, roomCtrler.deleteRoom)
router.get("/:id", roomCtrler.getRoom)
router.get("/", roomCtrler.getRooms)
router.put("/availability/:id", roomCtrler.updateRoomAvailability)

export default router
