const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const authorSchema = new Schema({
    name: { type: String, required: true, index: true },
    bio: { type: String },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
  });
  
  module.exports = mongoose.model('Author', authorSchema);