const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book-controller'); // Adjust the path as necessary

// Route to create a new book
router.post('/', bookController.createBook);

// Route to get all books
router.get('/', bookController.getBooks);

// Route to get a specific book by ID
router.get('/:id', bookController.getBookById);

// Route to get books by author ID
router.get('/author/:authorId', bookController.getBooksByAuthorId);

// Route to get books by genre ID
router.get('/genre/:genreId', bookController.getBooksByGenreId);

// Route to get books by publication ID
router.get('/publication/:publicationId', bookController.getBooksByPublicationId);

// Route to update a specific book by ID
router.patch('/:id', bookController.updateBook);

// Route to delete a specific book by ID
router.delete('/:id', bookController.deleteBook);


module.exports = router;