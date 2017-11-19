const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = require('../categories/categorySchema.js');

const categoryModel = mongoose.model('categories', categorySchema);


const pageSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    require: true,
    auto: true
  },
  name: {
    type: String,
    require: true
  },
  permalink_url: {
    type: String,
    require: true,
    unique: true
  },
  category: {
    type: [Schema.Types.ObjectId],
    ref: 'categories',
    required: true
  }
});

module.exports = pageSchema;
