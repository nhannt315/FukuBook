const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  permalink_url: {
    type: String,
    require: true
  },
  likes: {
    type: Number,
    require: true
  },
  comments: {
    type: Number,
  },
  shares: {
    type: Number,
    default: 0
  },
  message: {
    type: String
  },
  category: {
    type: String,
    require: true
  }
});

postSchema.index({'$**': 'text'});

module.exports = postSchema;
