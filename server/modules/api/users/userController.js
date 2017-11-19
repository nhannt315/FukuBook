const express = require('express');
const Router = express.Router();
const userModel = require('./userModel');
const passport = require('passport');

Router.post('/savePost', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userModel.savePost(req.body.post, req.user._id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

Router.get('/getPosts/:page', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userModel.getPosts(req.user._id, req.params.page, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

Router.post('/deletePost', passport.authenticate('jwt', { session: false }), (req, res) => {
  userModel.deletePost(req.body.post, req.user._id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

Router.get('/getPostsURL', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userModel.getPostsURL(req.user._id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

Router.post('/saveFavUrl', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userModel.saveFavUrl(req.body.url, req.user._id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      userModel.updatePostsFromFavUrls(req.user._id, (err, doc) => {
        if (err) {
          res.status(400);
          res.send(err);
        } else {
          res.send(doc);
        }
      });
    }
  })
});

Router.get('/getFavUrls', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userModel.getFavUrls(req.user._id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
})

Router.post('/deleteFavUrl', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userModel.deleteFavUrl(req.user._id, req.body.id, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      userModel.updatePostsFromFavUrls(req.user._id, (err, doc) => {
        if (err) {
        } else {
          res.send(doc);
        }
      });
    }
  });
});

Router.get('/getPostsFromFavUrls/:page', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  userModel.getPostsFromFavUrls(req.user._id, req.params.page, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

Router.post('/login', passport.authenticate('local', { session: false }), (req, res, next) => {
  let token = userModel.serializeUser(req.user, 60 * 60 * 24 * 3);
  return res.send({user: req.user, token: token});
});

Router.post('/register', function(req, res, next) {
  let newUser = {
    username: req.body.username,
    password: req.body.password
  }

  userModel.createUser(newUser, (err, doc) => {
    if (err) {
      res.status(400);
      res.send(err);
    } else {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          res.status(400);
          return next(err);
        }
        if (!user) {
          return res.send(info);
        } else {
          let token = userModel.serializeUser(user, 60 * 60 * 24 * 3);
          return res.send({user: user, token: token});
        }
      })(req, res, next);
    }
  });
});

Router.get('/auth/facebook', passport.authenticate('facebook'));

Router.get('/auth/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
      res.status(400);
      return next(err);
    }
    if (!user) {
      return res.send(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  })(req, res, next);
});

module.exports = Router;
