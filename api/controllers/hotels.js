import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}

export const createHotel = async (req, res, next) => {
  try {
    const savedHotel = await new Hotel(req.body).save()
    res.status(200).json(savedHotel)
  } catch (error) {
    next(error)
  }
}

export const updateHotel = async (req, res, next) => {
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

export const deleteHotel = async (req, res, next) => {
  const { id } = req.params
  try {
    const hotel = await Hotel.findByIdAndDelete(id)
    res.status(200).json(!!hotel)
  } catch (error) {
    next(error)
  }
}

export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query
  const clean = (obj) => {
    for (let propName in obj) {
      obj[propName] || delete obj[propName]
    }
    return obj
  }
  try {
    const hotel = await Hotel.find({
      ...clean(others),
      cheapestPrice: {
        $gte: min || 1,
        $lte: max || 999,
      },
    }).limit(limit)

    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",")
  try {
    const results = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city }))
    )
    res.status(200).json(results)
  } catch (error) {
    next(error)
  }
}

export const countByType = async (req, res, next) => {
  try {
    const results = await Promise.all(
      ["hotel", "apartment", "resort", "villa", "cabin"].map((type) =>
        Hotel.countDocuments({ type })
      )
    )
    res.status(200).json(results)
  } catch (error) {
    next(error)
  }
}

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
    const rooms = await Promise.all(
      hotel.rooms.map((roomId) => {
        return Room.findById(roomId)
      })
    )
    res.status(200).json(rooms)
  } catch (error) {
    next(error)
  }
}
