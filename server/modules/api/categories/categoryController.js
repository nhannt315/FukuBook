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

Router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.admin) {
    categoryModel.createNewCategory(req.body.name, req.body.alias, req.body.keywords, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.status(400);
    res.send("Unauthorized");
  }
});

Router.put("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.admin) {
    categoryModel.updateCategoryById(req.params.id, req.body, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.status(400);
    res.send("Unauthorized");
  }
});

Router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.admin) {
    categoryModel.deleteCategoryById(req.params.id, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.status(400);
    res.send("Unauthorized");
  }
});

module.exports = Router;
