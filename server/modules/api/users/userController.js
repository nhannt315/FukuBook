const express = require('express');
const Router = express.Router();
const userModel = require('./userModel');
const passport = require('passport');

Router.post('/savePost', (req, res, next) => {
  if (req.user != undefined) {
    userModel.savePost(req.body.post, req.user._id, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.send('401');
  }
});

Router.get('/getPosts/:page', (req, res, next) => {
  if (req.user != undefined) {
    userModel.getPosts(req.user._id, req.params.page, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.send('401');
  }
});

Router.post('/deletePost', (req, res) => {
  if (req.user != undefined) {
    userModel.deletePost(req.body.post, req.user._id, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.send('401');
  }
});

Router.get('/getPostsURL', (req, res, next) => {
  if (req.user != undefined) {
    userModel.getPostsURL(req.user._id, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.send('401');
  }
});

Router.post('/saveFavUrl', (req, res, next) => {
  if (req.user != undefined) {
    userModel.saveFavUrl(req.body.url, req.user._id, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        userModel.updatePostsFromFavUrls(req.user._id, (err, doc) => {
          if (err) {
            // console.log(err);
          } else {
            // console.log("update posts from favorite urls to database success");
            res.send(doc);
          }
        });
      }
    })
  } else {
    res.send('401');
  }
});


Router.get('/getFavUrls', (req, res, next) => {
  if (req.user != undefined) {
    userModel.getFavUrls(req.user._id, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.send('401');
  }
})

Router.post('/deleteFavUrl', (req, res, next) => {
  if (req.user != undefined) {
    userModel.deleteFavUrl(req.user._id, req.body.id, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        userModel.updatePostsFromFavUrls(req.user._id, (err, doc) => {
          if (err) {
            // console.log(err);
          } else {
            // console.log("update posts from favorite urls to database success");
            res.send(doc);
          }
        });
      }
    })
  } else {
    res.send('401')
  }
});

Router.get('/getPostsFromFavUrls/:page', (req, res, next) => {
  if (req.user != undefined) {
    userModel.getPostsFromFavUrls(req.user._id, req.params.page, (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  } else {
    res.send('401');
  }
})


Router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(info);
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      } else {
        if (req.body.remember === 'true') {
          res.cookie('remember', req.session.passport.user,  { maxAge: 900000});
        }
        return res.send(req.user);
      }
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
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.send(info);
        }
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          } else {
            return res.send(req.user);
          }
        });
      })(req, res, next);
    }
  });
});

Router.get('/logout', (req, res) => {
  res.clearCookie("remember");
  req.logout();
  res.send(req.session);
});

Router.get('/', (req, res, next) => {
  // console.log(req.session);
  // console.log(req.cookies);

  if (req.isAuthenticated()) {
    // console.log('authenticated login');
    return res.send(req.user);
  } else {
    if (req.cookies.remember) {
      req.headers.authorization = "JWT " + req.cookies.remember;
    } else {
      if ((req.session.passport == {})) {
        req.headers.authorization = "JWT " + req.session.passport.user;
      } else {
        // console.log('Unauthorized');
        return res.send("Unauthorized");
      }
    }
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
          req.logIn(user, function(err) {
            if (err) {
              return next(err);
            } else {
              // console.log('access token login');
              res.cookie('remember', req.session.passport.user,  { maxAge: 900000});
              return res.send(req.user);
            }
          });
        }
      })(req, res, next);
  }
});

Router.get('/auth/facebook', passport.authenticate('facebook'));

Router.get('/auth/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', function(err, user, info) {
    if (err) {
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
