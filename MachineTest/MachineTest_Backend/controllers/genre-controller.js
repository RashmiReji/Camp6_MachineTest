const Genre = require('../model/genre'); // Adjust the path as necessary
const HttpError = require('../model/http-error'); // Custom error handling model (adjust the path as necessary)

// Create a new genre
exports.createGenre = async (req, res) => {
  try {
    const { name, description, books } = req.body;
    if (!name) {
      throw new HttpError(400, 'Genre name is required');
    }
    const genre = new Genre({
      name,
      description,
      books
    });
    await genre.save();
    res.status(201).json({ message: 'Genre created successfully', genre });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Get all genres
exports.getGenres = async (req, res) => {
  try {
    const genres = await Genre.find().populate('books');
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres', error });
  }
};

// Get a genre by ID
exports.getGenreById = async (req, res) => {
  try {
    const genreId = req.params.id;
    const genre = await Genre.findById(genreId).populate('books');
    if (!genre) {
      throw new HttpError(404, 'Genre not found');
    }
    res.json(genre);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Update a genre by ID
exports.updateGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const genre = await Genre.findByIdAndUpdate(genreId, req.body, { new: true });
    if (!genre) {
      throw new HttpError(404, 'Genre not found');
    }
    res.json({ message: 'Genre updated successfully', genre });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Delete a genre by ID
exports.deleteGenre = async (req, res) => {
  try {
    const genreId = req.params.id;
    const genre = await Genre.findByIdAndRemove(genreId);
    if (!genre) {
      throw new HttpError(404, 'Genre not found');
    }
    res.json({ message: 'Genre deleted successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// module.exports = { createGenre, getGenres, getGenreById, updateGenre, deleteGenre };