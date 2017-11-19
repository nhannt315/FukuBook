const mongoose = require('mongoose');
const categorySchema = require('./categorySchema');

const categoryModel = mongoose.model('categories', categorySchema);

const getAllCategoriesFromDB = (callback) => {
  categoryModel.find({}).lean().exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
}

const createNewCategory = (categoryName, keywords, callback) => {
  var newCategory = {
    name: categoryName,
    keywords: keywords
  }
  categoryModel.create(newCategory, (err, doc) => {
    if (err) {
      console.log('createNewCategory ERROR ', err);
    } else {
      callback(null, doc);
    }
  });
}

const deleteCategoryById = (id) => {
  categoryModel.remove({
    _id: id
  }, function(err) {
    if (err) {
      console.log('deleteCategoryById ERROR ', err);
    } else {
      console.log("deleteCategoryById SUCCESS");
    }
  });
}

const updateCategoryById = (id, fields, callback) => {
  categoryModel.findOneAndUpdate({
    _id: id
  }, fields, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

module.exports = {
  getAllCategoriesFromDB,
  createNewCategory,
  deleteCategoryById
}
