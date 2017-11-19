const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    require: true,
    auto: true
  },
  name: {
    type: String,
    require: true,
    unique: true
  },
  alias: {
    type: String,
    require: true
  },
  keywords: {
    type: [String],
    require: true
  }
});

module.exports = categorySchema;
