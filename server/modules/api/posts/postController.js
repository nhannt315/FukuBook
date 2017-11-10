const express = require('express');
const Router = express.Router();
const postHelper = require('./postHelper.js');
const config = require('../../../config.json');
const postModel = require('./postModel.js');

Router.get('/:category/:page', (req, res) => {
  postModel.getPostsFromDBWithCategory(req.params.category, req.params.page, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.get('/all/:page', (req, res) => {
  postModel.getAllPostsFromDB(req.params.page, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = Router;
