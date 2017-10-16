const express = require('express');
const Router = express.Router();
const userModel = require('./userModel');
const passport = require('passport');

Router.post('/login', (req, res, next) => {
  passport.authenticate('local',{ session: false }, function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(info);
    }
    res.json({
      token: user
    });
  })(req, res, next);
});

Router.post('/register', function(req, res, next) {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    email: req.body.email,
    avatar: req.body.avatar,
    dob: req.body.dob
  }

  userModel.createUser(newUser, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      passport.authenticate('local',{ session: false }, function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.send(info);
        }
        res.json({
          token: user
        });
      })(req, res, next);
    }
  });
});

// Router.get('/logout', (req, res) => {
//   req.logout();
//   res.send(req.session);
// });

Router.get('/', (req, res, next) => {
    passport.authenticate('jwt', {
        session: false
      },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.send(info);
        } else {
          res.send(user);
        }
      })(req, res, next);
});



module.exports = Router;
