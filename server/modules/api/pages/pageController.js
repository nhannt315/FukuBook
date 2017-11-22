const express = require('express');
const Router = express.Router();
const config = require('../../../config.json');
const pageModel = require('./pageModel.js');
const passport = require('passport');

Router.get("/all", (req, res) => {
  pageModel.getAllPagesFromDB((err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

Router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user.admin) {
    pageModel.createNewPageWithCategoryId(req.body.permalink_url, req.body.name, req.body.category, (err, result) => {
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
    pageModel.updatePageById(req.params.id, req.body, (err, result) => {
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
    pageModel.deletePageById(req.params.id, (err, result) => {
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
