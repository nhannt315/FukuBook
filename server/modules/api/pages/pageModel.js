const mongoose = require('mongoose');
const pageSchema = require('./pageSchema');
const categoryModel = require('../categories/categoryModel.js');
const categoryHelper = require('../categories/categoryHelper.js');

const pageModel = mongoose.model('pages', pageSchema);

const getAllPagesFromDB = (callback) => {
  pageModel.find({}).lean().exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
}

const createNewPage = (pageName, pageUrl, pageCategory, callback) => {
  categoryModel.getAllCategoriesFromDB((listCategory) => {
    var categoryId = [];
    for (category in pageCategory) {
      categoryId.push(categoryHelper.getCategoryIdFromNameWithList(listCategory, pageCategory[category]));
    }
    var newPage = {
      name: pageName,
      permalink_url: pageUrl,
      category: categoryId
    }
    pageModel.create(newPage, (err, doc) => {
      if (err) {
        console.log('createNewPage ERROR ', err);
      } else {
        callback(null, doc);
      }
    });
  });
}

const deletePageById = (id) => {
  pageModel.remove({
    _id: id
  }, function(err) {
    if (err) {
      console.log('deletePageById ERROR ', err);
    } else {
      console.log("deletePageById SUCCESS");
    }
  });
}

const updatePageById = (id, fields, callback) => {
  pageModel.findOneAndUpdate({
    _id: id
  }, fields, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const getPageById = (id, callback) => {
  pageModel.findOne({
    _id: id
  }, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(null, doc);
    }
  })
}

module.exports = {
  getAllPagesFromDB,
  createNewPage,
  deletePageById,
  updatePageById,
  getPageById
}
