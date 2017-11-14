const mongoose = require('mongoose');
const categorySchema = require('./categorySchema');

const categoryModel = mongoose.model('categories', categorySchema);

const getAllCategoriesFromDB = (callback) => {
  categoryModel.find({}).exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

const createNewCategory = (newCategory, callback) => {
  categoryModel.create(newCategory, (err, doc) => {
    if (err) {
      console.log('createNewCategory ERROR ', err);
    } else {
      callback(null, doc);
    }
  })
}

const deleteCategoryById = (id) => {
  categoryModel.remove({
    id: id
  }, function(err) {
    if (err) {
      console.log('deleteCategoryById ERROR ', err);
    } else {
      console.log("deleteCategoryById SUCCESS");
    }
  })
}

module.exports = {
  getAllCategoriesFromDB,
  createNewCategory,
  deleteCategoryById
}
