const express = require('express');
const router = express.Router();
const publicationController = require('../controllers/publication-controller'); // Adjust the path as necessary

// Route to create a new publication
router.post('/', publicationController.createPublication);

// Route to get all publications
router.get('/', publicationController.getPublications);

// Route to get a specific publication by ID
router.get('/:id', publicationController.getPublicationById);

// Route to update a specific publication by ID
router.patch('/:id', publicationController.updatePublication);

// Route to delete a specific publication by ID
router.delete('/:id', publicationController.deletePublication);

module.exports = router;