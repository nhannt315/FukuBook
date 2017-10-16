const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = require('./userSchema');
const passport = require('passport');
const passportJWT = require("passport-jwt");
const jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = 'secret';

let userModel = mongoose.model('users', userSchema);

const createUser = (user, callback) => {
  userModel.create(user, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
};

passport.use(new LocalStrategy(
  function(username, password, done) {
    userModel.findOne({
      "username": username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }

      bcrypt.compare(password, user.password, (err, isValid) => {
        if (err) {
          return done(err);
        }
        if (!isValid) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        let payload = {
          id: user.id
        };
        let token = jwt.sign(payload, jwtOptions.secretOrKey, {
          expiresIn: 60 * 60 * 24 * 3
        });
        return done(null, token);
      });
    })
  }));

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  userModel.findOne({
    "_id": jwt_payload.id
  }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false);
    } else {
      return next(null, user);
    }
  })
}));

// passport.serializeUser(function(user, done) {
//   var payload = {
//     id: user.id
//   };
//   var token = jwt.sign(payload, jwtOptions.secretOrKey, {
//     expiresIn: 60 * 60 * 24 * 30
//   });
//   done(null, token);
// });
//
// passport.deserializeUser(function(token, done) {
//   decoded = jwt.decode(token);
//   userModel.findById(decoded.id, function(err, user) {
//     done(err, user);
//   });
// });

module.exports = {
  createUser
}
