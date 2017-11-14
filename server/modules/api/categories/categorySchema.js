const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true
  }
});

module.exports = categorySchema;
