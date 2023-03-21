import User from "../models/User.js"

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const createUser = async (req, res) => {
  try {
    const savedUser = await new User(req.body).save()
    res.status(200).json(savedUser)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    )
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    res.status(200).json(!!user)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const getUsers = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByIdAndDelete(id)
    res.status(200).json(!!user)
  } catch (error) {
    res.status(500).json(error)
  }
}
