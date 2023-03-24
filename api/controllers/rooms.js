import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import { createError } from "../utils/error.js"

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id)
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}

export const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId
    const savedRoom = await new Room(req.body).save()
    if (savedRoom) {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      })
    }
    res.status(200).json(!!savedRoom)
  } catch (error) {
    next(error)
  }
}

export const updateRoom = async (req, res, next) => {
  const { id } = req.params
  try {
    const room = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}

export const deleteRoom = async (req, res, next) => {
  const { id, hotelId } = req.params
  try {
    const room = await Room.findByIdAndDelete(id)
    if (room) {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: room._id },
      })
    }
    res.status(200).json(!!room)
  } catch (error) {
    next(error)
  }
}

export const getRooms = async (req, res, next) => {
  try {
    const room = await Room.find()
    res.status(200).json(room)
  } catch (error) {
    next(error)
  }
}

export const updateRoomAvailability = async (req, res, next) => {
  try {
    const result = await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    )

    if (!result.modifiedCount) {
      return next(createError(400, "Room status has been not updated."))
    }

    res.status(200).json({ message: "Room status has been updated." })
  } catch (err) {
    next(err)
  }
}
