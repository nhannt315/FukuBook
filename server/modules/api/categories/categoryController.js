const express = require('express');
const Router = express.Router();
const config = require('../../../config.json');
const categoryModel = require('./categoryModel.js');

Router.get("/all", (req, res) => {
  categoryModel.getAllCategoriesFromDB((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.get("/:name", (req, res) => {
  categoryModel.getCategoryByName(req.params.name, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.post("/", (req, res) => {
  categoryModel.createNewCategory(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.put("/:name", (req, res) => {
  categoryModel.updateCategoryByName(req.params.name, req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.delete("/:name", (req, res) => {
  categoryModel.deleteCategoryByName(req.params.name, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = Router;
