import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"

export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    res.status(200).json(room)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createRoom = async (req, res, next) => {
  try {
    const hotelId = req.params.hotelId
    const savedRoom = await new Room(req.body).save()
    try {
      const result = await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      })
      console.log("🚀 ~ file: rooms.js:21 ~ createRoom ~ result:", result)
    } catch (err) {
      next(err)
    }
    res.status(200).json(savedRoom)
  } catch (error) {
    res.status(500).json(error)
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
    res.status(500).json(error)
  }
}

export const deleteRoom = async (req, res) => {
  const { id } = req.params
  try {
    const room = await Room.findByIdAndDelete(id)
    res.status(200).json(!!room)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getRooms = async (req, res) => {
  const { id } = req.params
  try {
    const room = await Room.findByIdAndDelete(id)
    res.status(200).json(!!room)
  } catch (error) {
    res.status(500).json(error)
  }
}
