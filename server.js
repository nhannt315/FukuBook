const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const http = require('http');

const config = require('./server/config.json');

const userApi = require('./server/modules/api/users/userController');

var app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(config.connectionDatabase, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connect to db success');
    }
})
;

app.use('/api/user', userApi);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})
;

// app.use(express.static(__dirname + "/public"));

const server = http.createServer(app);
server.listen(config.port, () => {
    console.log(`App listen on ${config.port}`);
})
;

// app.listen(config.port , () => {
//   console.log(`App listen on ${config.port}`);
// })
