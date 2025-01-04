const express = require('express');
const { addUser, getAllUsers, deleteUser } = require('../controllers/userController'); // Add deleteUser

const router = express.Router();

router.post('/add', addUser);         // Add a new user
router.get('/', getAllUsers);         // Get all users
router.delete('/delete', deleteUser); // Delete a user (unsubscribe)

module.exports = router;
