const Newsletter = require('../models/newsletter');

// Add a user to the newsletter
const addUser = async (req, res, next) => {
  const { username, email } = req.body;

  if (!username || !email) {
    const error = new Error('Username and email are required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const userExists = await Newsletter.findOne({ email });
    if (userExists && userExists.isSubscribed) {
      const error = new Error('User already subscribed');
      error.statusCode = 400;
      return next(error);
    }
    if(userExists && !userExists.isSubscribed){
      userExists.isSubscribed=true;
      userExists.username=username;
      userExists.save();
      return res.status(201).json({ message: 'User successfully subscribed', userExists });
    }
    const user = await Newsletter.create({ username, email });
    res.status(201).json({ message: 'User added to the newsletter', user });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await Newsletter.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Delete a user from the newsletter
const unsubscribeUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    const error = new Error('Email is required');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await Newsletter.findOne({ email });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    if(!user.isSubscribed){
      const error = new Error('User already unsubscribed');
      error.statusCode = 404;
      return next(error);
    }
    user.isSubscribed=false;
    user.save();

    res.status(200).json({ message: 'User unsubscribed successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { addUser, getAllUsers, unsubscribeUser };
