const Publication = require('../model/publication'); // Adjust the path as necessary
const HttpError = require('../model/http-error'); // Adjust the path as necessary

// Create a new publication
exports.createPublication = async (req, res) => {
  try {
    const { name, description, books } = req.body;
    if (!name) {
      throw new HttpError(400, 'Publication name is required');
    }
    const publication = new Publication({
      name,
      description,
      books
    });
    await publication.save();
    res.status(201).json({ message: 'Publication created successfully', publication });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Get all publications
exports.getPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate('books');
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching publications', error });
  }
};

// Get a publication by ID
exports.getPublicationById = async (req, res) => {
  try {
    const publicationId = req.params.id;
    const publication = await Publication.findById(publicationId).populate('books');
    if (!publication) {
      throw new HttpError(404, 'Publication not found');
    }
    res.json(publication);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Update a publication by ID
exports.updatePublication = async (req, res) => {
  try {
    const publicationId = req.params.id;
    const publication = await Publication.findByIdAndUpdate(publicationId, req.body, { new: true });
    if (!publication) {
      throw new HttpError(404, 'Publication not found');
    }
    res.json({ message: 'Publication updated successfully', publication });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// Delete a publication by ID
exports.deletePublication = async (req, res) => {
  try {
    const publicationId = req.params.id;
    const publication = await Publication.findByIdAndRemove(publicationId);
    if (!publication) {
      throw new HttpError(404, 'Publication not found');
    }
    res.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, error });
  }
};

// module.exports = { createPublication, getPublications, getPublicationById, updatePublication, deletePublication };