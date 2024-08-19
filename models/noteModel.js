const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,  // Removes leading and trailing whitespace
    maxlength: 100 // Limits the title length to 100 characters
  },
  description: {
    type: String,
    trim: true,  // Removes leading and trailing whitespace
    required: true,
    maxlength: 1000 // Limits the details length to 1000 characters
  }
}, {timestamps: true});

// // Middleware to update the updatedAt field on each save
// notesSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

const Note = mongoose.model('Note', notesSchema);
module.exports = Note;