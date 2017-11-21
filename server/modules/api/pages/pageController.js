const express = require('express');
const Router = express.Router();
const config = require('../../../config.json');
const pageModel = require('./pageModel.js');

Router.get("/all", (req, res) => {
  pageModel.getAllPagesFromDB((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.post("/", (req, res) => {
  console.log("req.body:\n", req.body);
  console.log("req.body.permalink_url:\n", req.body.permalink_url);
  console.log("req.body.name:\n", req.body.name);
  console.log("req.body.category:\n", req.body.category);
  pageModel.createNewPageWithCategoryId(req.body.permalink_url, req.body.name, req.body.category, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.put("/:id", (req, res) => {
  pageModel.updatePageById(req.params.id, req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.delete("/:id", (req, res) => {
  pageModel.deletePageById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.get("/:url", (req, res) => {
  pageModel.getPageByUrl(req.params.url, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = Router;
