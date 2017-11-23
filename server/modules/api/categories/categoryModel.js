const mongoose = require('mongoose');
const categorySchema = require('./categorySchema');

const categoryModel = mongoose.model('categories', categorySchema);

const getAllCategoriesFromDB = (callback) => {
  categoryModel.find({}).lean().exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

const createNewCategory = (categoryName, categoryAlias, keywords, callback) => {
  var newCategory = {
    name: categoryName,
    alias: categoryAlias,
    keywords: keywords
  }
  categoryModel.create(newCategory, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const deleteCategoryById = (id, callback) => {
  categoryModel.remove({
    _id: id
  }, function(err, doc) {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
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

const getCategoryById = (id, callback) => {
  categoryModel.findOne({
    _id: id
  }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

const deleteCategoryByName = (name, callback) => {
  categoryModel.remove({
    name: name
  }, function(err, doc) {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const updateCategoryByName = (name, fields, callback) => {
  categoryModel.findOneAndUpdate({
    name: name
  }, fields, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const getCategoryByName = (name, callback) => {
  categoryModel.findOne({
    name: name
  }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

module.exports = {
  getAllCategoriesFromDB,
  createNewCategory,
  deleteCategoryById,
  updateCategoryById,
  getCategoryById,
  deleteCategoryByName,
  updateCategoryByName,
  getCategoryByName
}
