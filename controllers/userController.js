const User = require('../models/user');

// Add a user to the newsletter
const addUser = async (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  try {
    const user = await User.create({ username, email });
    res.status(201).json({ message: 'User added to the newsletter', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (for sending newsletters)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addUser, getAllUsers };
