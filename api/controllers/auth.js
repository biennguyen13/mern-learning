import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { createError } from "../utils/error.js"

export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const user = await new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    }).save()
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })

    if (!user) {
      return next(createError(401, "User not found"))
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return next(createError(401, "Wrong password"))
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    )

    const { password, isAdmin, ...otherDetails } = user._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin })
  } catch (error) {
    res.status(500).json(error)
  }
}
