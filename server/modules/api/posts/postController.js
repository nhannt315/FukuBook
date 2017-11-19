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
    var shop = (req.query.hasOwnProperty("shop")) ? req.query.shop : null;
    console.log("page " + page + " limit " + limit + " filter " + filter + " shop " + shop);
    postModel.getPostsFromDBWithCategoryWithFilterWithPageWithLimitWithShop(req.params.category, filter, page, limit, shop, (err, result) => {
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

Router.post("/", (req, res) => {
  postModel.createNewPost(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.put("/:id", (req, res) => {
  postModel.updatePostById(req.params.id, req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.delete("/:id", (req, res) => {
  postModel.deletePostById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.get("/:id", (req, res) => {
  pageModel.getPostById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = Router;
