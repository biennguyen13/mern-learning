import Hotel from "../models/Hotel.js"

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
  try {
    const hotel = await Hotel.find()
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
    const hotel = await Hotel.find({
      $and: [{ type: req.params.type }],
    }).count()
    res.status(200).json(hotel)
  } catch (error) {
    next(error)
  }
}
