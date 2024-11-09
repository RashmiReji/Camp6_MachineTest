const mongoose = require('mongoose');
const Book = require('../model/book'); // Adjust the path as necessary
const Author = require('../model/author'); // Adjust the path as necessary
const Genre = require('../model/genre'); // Adjust the path as necessary
const Publication = require('../model/publication'); // Adjust the path as necessary
const HttpError = require('../model/http-error'); // Custom error handling model (adjust the path as necessary)

// Create a new book
exports.createBook = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { title, author, price, publication, genre, isbn } = req.body;
      if (!title || !price || !isbn || !author || !publication || !genre) {
        throw new HttpError(400, 'Title, price, ISBN, author, publication, and genre are required');
      }
  
      // Check if author, genre, and publication exist
      const existingAuthor = await Author.findById(author).session(session);
      const existingGenre = await Genre.findById(genre).session(session);
      const existingPublication = await Publication.findById(publication).session(session);
  
      if (!existingAuthor || !existingGenre || !existingPublication) {
        throw new HttpError(400, 'Author, Genre, or Publication not found');
      }
  
      // Create the book
      const book = new Book({
        title,
        author,
        price,
        publication,
        genre,
        isbn
      });
  
      await book.save({ session });
  
      // Update the author's books array
      existingAuthor.books.push(book._id);
      await existingAuthor.save({ session });
  
      // Update the publication's books array
      existingPublication.books.push(book._id);
      await existingPublication.save({ session });
  
      // Update the genre's books array
      existingGenre.books.push(book._id);
      await existingGenre.save({ session });
  
      await session.commitTransaction();
      res.status(201).json({ message: 'Book created successfully', book });
    } catch (error) {
      await session.abortTransaction();
      res.status(error.status || 500).json({ message: error.message, error });
    } finally {
      session.endSession();
    }
  };
// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('author publication genre');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
};

// Get a book by ID
exports.getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('author publication genre');
    if (!book) {
      throw new HttpError(404, 'Book not found');
    }
    res.json(book);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};
// Get a book by authorID
    exports.getBooksByAuthorId = async (req, res) => {
    const authorId = req.params.authorId;
    try {
      const books = await Book.find({ author: authorId }).populate('author publication genre');
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books by author', error });
    }
  };
  
  // Get books by genre ID
  exports.getBooksByGenreId = async (req, res) => {
    const genreId = req.params.genreId;
    try {
      const books = await Book.find({ genre: genreId }).populate('author publication genre');
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books by genre', error });
    }
  };
  
  // Get books by publication ID
  exports.getBooksByPublicationId = async (req, res) => {
    const publicationId = req.params.publicationId;
    try {
      const books = await Book.find({ publication: publicationId }).populate('author publication genre');
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books by publication', error });
    }
  };
  
  // Update a book by ID
  exports.updateBook = async (req, res) => {
    try {
      const bookId = req.params.id;
      const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true }).populate('author publication genre');
      if (!book) {
        throw new HttpError(404, 'Book not found');
      }
      res.json({ message: 'Book updated successfully', book });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message, error });
    }
  };
  
  // Delete a book by ID
  exports.deleteBook = async (req, res) => {
    const bookId = req.params.id;
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const book = await Book.findById(bookId).session(session);
      if (!book) {
        throw new HttpError(404, 'Book not found');
      }
  
      // Remove the book from author's books array
      const author = await Author.findById(book.author).session(session);
      author.books.pull(bookId);
      await author.save({ session });
  
      // Remove the book from publication's books array
      const publication = await Publication.findById(book.publication).session(session);
      publication.books.pull(bookId);
      await publication.save({ session });
  
      // Remove the book from genre's books array
      const genre = await Genre.findById(book.genre).session(session);
      genre.books.pull(bookId);
      await genre.save({ session });
  
      // Delete the book
      await Book.findByIdAndDelete(bookId).session(session);
  
      await session.commitTransaction();
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      await session.abortTransaction();
      res.status(error.status || 500).json({ message: error.message, error });
    } finally {
      session.endSession();
    }
  };

  
  
// module.exports = { createBook, getBooks, getBookById, updateBook, deleteBook };