const express = require('express');
const Router = express.Router();
const postHelper = require('./postHelper.js');
const config = require('../../config.json');
const postModel = require('./postModel.js');

Router.get('/category', (req, res) => {
  postModel.getPostsFromDBWithCategory(req.params.category, (result) => {
    res.send(result);
  });
});

Router.get('/all', (req, res) => {
  postModel.getAllPostsFromDB((result) => {
    res.send(result);
  });
});

module.exports = Router;
