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

Router.get("/:id", (req, res) => {
  categoryModel.getCategoryById(req.params.id, (err, result) => {
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

Router.put("/:id", (req, res) => {
  categoryModel.updateCategoryById(req.params.id, req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.delete("/:id", (req, res) => {
  categoryModel.deleteCategoryById(req.params.id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

module.exports = Router;
