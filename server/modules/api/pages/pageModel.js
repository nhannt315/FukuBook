const mongoose = require('mongoose');
const pageSchema = require('./pageSchema');

const pageModel = mongoose.model('pages', pageSchema);

const getAllPagesFromDB = (callback) => {
  pageModel.find({}).exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

const createNewPage = (newPage, callback) => {
  pageModel.create(newPage, (err, doc) => {
    if (err) {
      console.log('createNewPage ERROR ', err);
    } else {
      callback(null, doc);
    }
  })
}

const deletePageById = (id) => {
  pageModel.remove({
    id: id
  }, function(err) {
    if (err) {
      console.log('deletePageById ERROR ', err);
    } else {
      console.log("deletePageById SUCCESS");
    }
  })
}

module.exports = {
  getAllPagesFromDB,
  createNewPage,
  deletePageById
}
