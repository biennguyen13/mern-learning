import express from "express"
import * as authCtrler from "../controllers/auth.js"

const router = express.Router()

router.post("/register", authCtrler.register)
router.post("/login", authCtrler.login)

export default router
