const express = require('express');
const Router = express.Router();
const postHelper = require('./postHelper.js');
const config = require('../../../config.json');
const postModel = require('./postModel.js');

Router.get('/:category', (req, res) => {
  if (req.query !== {}) {
    console.log("has query");
    console.log("category " + req.params.category);
    var page = (req.query.hasOwnProperty("page")) ? parseInt(req.query.page) : 0;
    var limit = (req.query.hasOwnProperty("limit")) ? parseInt(req.query.limit) : 0;
    var filter = (req.query.hasOwnProperty("filter")) ? req.query.filter : null;
    console.log("page " + page + " limit " + limit + " filter " + filter);
    postModel.getPostsFromDBWithCategoryWithFilterWithPageWithLimit(req.params.category, filter, page, limit, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    console.log("no query");
    console.log("category " + req.params.category);
    postModel.getAllPostsFromDBWithCategory(req.params.category, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }
});

module.exports = Router;
