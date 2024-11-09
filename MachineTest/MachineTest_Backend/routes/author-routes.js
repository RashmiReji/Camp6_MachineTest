const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author-controller'); // Adjust the path as necessary

// Route to create a new author
router.post('/', authorController.createAuthor);

// Route to get all authors
router.get('/', authorController.getAuthors);

// Route to get a specific author by ID
router.get('/:id', authorController.getAuthorById);

// Route to update a specific author by ID
router.patch('/:id', authorController.updateAuthor);

// Route to delete a specific author by ID
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;