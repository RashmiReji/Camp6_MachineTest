const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: { type: String, required: true, index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    price: { type: Number, required: true },
    publication: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication' },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre' },
    rentalRate: { type: Number, default: function() { return this.price * 0.05; } },
    rentalPeriod: { type: Number, default: 10 },
    isAvailable: { type: Boolean, default: true },
    isbn: { type: String, required: true, unique: true }
    
  });
  
  module.exports = mongoose.model('Book', bookSchema);