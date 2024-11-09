const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const genreSchema = new Schema({
    name: { type: String, required: true, index: true },
    description: { type: String },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
  });
  
 module.exports= mongoose.model('Genre', genreSchema);