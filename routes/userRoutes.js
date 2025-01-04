const express = require('express');
const { addUser, getAllUsers, unsubscribeUser } = require('../controllers/userController'); // Add deleteUser

const router = express.Router();

router.post('/add', addUser);         // Add a new user
router.get('/', getAllUsers);         // Get all users
router.put('/unsubscribe', unsubscribeUser); // Unsubscribe a user (unsubscribe)

module.exports = router;
