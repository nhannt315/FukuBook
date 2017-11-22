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

const createNewPageWithCategoryName = (pageUrl, pageName, pageCategory, callback) => {
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
        callback(err);
      } else {
        callback(null, doc);
      }
    });
  });
}

const createNewPageWithCategoryId = (pageUrl, pageName, pageCategory, callback) => {
  var newPage = {
    name: pageName,
    permalink_url: pageUrl,
    category: pageCategory
  }
  pageModel.create(newPage, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const deletePageById = (id, callback) => {
  pageModel.remove({
    _id: id
  }, function(err, doc) {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
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
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

const deletePageByUrl = (url, callback) => {
  pageModel.remove({
    permalink_url: url
  }, function(err, doc) {
    if (err) {
      callback(err)
    } else {
      callback(null, doc);
    }
  });
}

const updatePageByUrl = (url, fields, callback) => {
  pageModel.findOneAndUpdate({
    permalink_url: url
  }, fields, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const getPageByUrl = (url, callback) => {
  pageModel.findOne({
    permalink_url: url
  }).exec((err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

module.exports = {
  getAllPagesFromDB,
  createNewPageWithCategoryName,
  createNewPageWithCategoryId,
  deletePageById,
  updatePageById,
  getPageById,
  deletePageByUrl,
  updatePageByUrl,
  getPageByUrl
}
