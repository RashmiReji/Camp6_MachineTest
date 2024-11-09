const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const publicationSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
  });
  
module.exports = mongoose.model('Publication', publicationSchema);
  
  