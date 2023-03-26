import jwt from "jsonwebtoken"
import { createError } from "./error.js"

export const verifyToken = (req, res, next, next2) => {
  const token = req.headers.authorization ?? req.cookies.access_token
  if (!token) {
    return next(createError(401, "Token is not provided"))
  }
  jwt.verify(token, process.env.JWT, (err, decoded) => {
    if (err) {
      return next(createError(403, "Token is not valid"))
    }
    req.user = decoded
    next2()
  })
}
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, "You are not authorized"))
    }
  })
}
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next()
    } else {
      return next(createError(403, "You are not authorized!"))
    }
  })
}
