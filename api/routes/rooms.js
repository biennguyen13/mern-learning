import express from "express"
import * as roomCtrler from "../controllers/rooms.js"
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

router.get("/:id", verifyUser, roomCtrler.getRoom)
router.post("/:hotelId", verifyUser, roomCtrler.createRoom)
router.put("/:id", verifyAdmin, roomCtrler.updateRoom)
router.delete("/:id", verifyAdmin, roomCtrler.deleteRoom)
router.get("/", roomCtrler.getRooms)

export default router
