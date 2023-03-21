import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"

export const getRoom = async (req, res) => {
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

export const updateRoom = async (req, res) => {
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

export const deleteRoom = async (req, res) => {
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

export const getRooms = async (req, res) => {
  const { id } = req.params
  try {
    const room = await Room.findByIdAndDelete(id)
    res.status(200).json(!!room)
  } catch (error) {
    next(error)
  }
}
