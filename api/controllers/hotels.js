import Hotel from "../models/Hotel.js"

export const getHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}

export const createHotel = async (req, res) => {
  try {
    const savedHotel = await new Hotel(req.body).save()
    res.status(200).json(savedHotel)
  } catch (error) {
    next(error)
  }
}

export const updateHotel = async (req, res) => {
  const { id } = req.params
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}

export const deleteHotel = async (req, res) => {
  const { id } = req.params
  try {
    const hotel = await Hotel.findByIdAndDelete(id)
    res.status(200).json(!!hotel)
  } catch (error) {
    next(error)
  }
}

export const getHotels = async (req, res) => {
  const { id } = req.params
  try {
    const hotel = await Hotel.findByIdAndDelete(id)
    res.status(200).json(!!hotel)
  } catch (error) {
    next(error)
  }
}
