const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const http = require('http');
const postModel = require('./server/modules/api/posts/postModel.js');
const config = require('./server/config.json');

const userApi = require('./server/modules/api/users/userController');
const postApi = require('./server/modules/api/posts/postController');


var app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({
  extended: true
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
mongoose.connect(config.connectionDatabase, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
  }
});

app.use('/user', userApi);
app.use('/post', postApi);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);

let port = process.env.PORT || config.port;
server.listen(port, () => {
  console.log(`App listen on ${port}`);
});

setInterval(function() {
  postModel.updateDatabase();
}, 60 * 1000 * 3);

// app.listen(config.port , () => {
//   console.log(`App listen on ${config.port}`);
// })
