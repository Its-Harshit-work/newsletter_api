const express = require('express');
const { addUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/add', addUser);     // Add a new user
router.get('/', getAllUsers);    // Get all users

module.exports = router;
