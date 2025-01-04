const User = require('../models/user');

// Add a user to the newsletter
const addUser = async (req, res, next) => {
  const { username, email } = req.body;

  if (!username || !email) {
    const error = new Error('Username and email are required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error('User already subscribed');
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.create({ username, email });
    res.status(201).json({ message: 'User added to the newsletter', user });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Delete a user from the newsletter
const deleteUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    const error = new Error('Email is required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({ message: 'User unsubscribed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { addUser, getAllUsers, deleteUser };
