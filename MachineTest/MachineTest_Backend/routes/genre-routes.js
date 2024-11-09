const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre-controller'); // Adjust the path as necessary

// Route to create a new genre
router.post('/', genreController.createGenre);

// Route to get all genres
router.get('/', genreController.getGenres);

// Route to get a specific genre by ID
router.get('/:id', genreController.getGenreById);

// Route to update a specific genre by ID
router.patch('/:id', genreController.updateGenre);

// Route to delete a specific genre by ID
router.delete('/:id', genreController.deleteGenre);

module.exports = router;