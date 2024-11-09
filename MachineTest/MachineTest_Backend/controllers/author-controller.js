const Author = require('../model/author'); // Adjust the path as necessary
const HttpError = require('../model/http-error'); // Custom error handling model (adjust the path as necessary)

// Create a new author
exports.createAuthor = async (req, res) => {
  try {
    const { name, bio, books } = req.body;
    if (!name) {
      throw new HttpError(400, 'Author name is required');
    }
    const author = new Author({
      name,
      bio,
      books
    });
    await author.save();
    res.status(201).json({ message: 'Author created successfully', author });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Get all authors
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate('books');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authors', error });
  }
};

// Get an author by ID
exports.getAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findById(authorId).populate('books');
    if (!author) {
      throw new HttpError(404, 'Author not found');
    }
    res.json(author);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Update an author by ID
exports.updateAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByIdAndUpdate(authorId, req.body, { new: true });
    if (!author) {
      throw new HttpError(404, 'Author not found');
    }
    res.json({ message: 'Author updated successfully', author });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Delete an author by ID
exports.deleteAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const author = await Author.findByIdAndRemove(authorId);
    if (!author) {
      throw new HttpError(404, 'Author not found');
    }
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// module.exports = { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor };