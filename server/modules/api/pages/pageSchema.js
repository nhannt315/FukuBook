const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pageSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true
  },
  permalink_url: {
    type: String,
    require: true
  }
});

module.exports = {
  pageSchema
};
