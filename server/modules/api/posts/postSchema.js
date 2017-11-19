const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = require('../categories/categorySchema.js');
const pageSchema = require('../pages/pageSchema.js');

const categoryModel = mongoose.model('categories', categorySchema);
const pageModel = mongoose.model('pages', pageSchema);

const postSchema = new Schema({
  fb_id: {
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
    type: [Schema.Types.ObjectId],
    ref: 'categories',
    require: true
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: 'pages',
    required: true
  }
});

postSchema.index({
  '$**': 'text'
});

module.exports = postSchema;
