import express from "express"
import * as userCtrler from "../controllers/users.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const router = express.Router()

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and you can delete your account")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

router.get("/:id", verifyUser, userCtrler.getUser)
router.post("/", verifyUser, userCtrler.createUser)
router.put("/:id", verifyUser, userCtrler.updateUser)
router.delete("/:id", verifyUser, userCtrler.deleteUser)
router.get("/", verifyAdmin, userCtrler.getUsers)

export default router
