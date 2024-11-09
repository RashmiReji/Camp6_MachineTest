const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller'); // Adjust the path as necessary

// Route to sign up a new user
router.post('/signup', userController.signup);

// Route to log in a user
router.post('/login', userController.login);

// Route to get all users
// router.get('/', userController.getUsers);

// Route to get a specific user by ID
// router.get('/:id', userController.getUserById); // Fixed function name

// Route to update a specific user by ID
// router.patch('/:id', userController.updateUser );

// Route to delete a specific user by ID
// router.delete('/:id', userController.deleteUser );

module.exports = router;