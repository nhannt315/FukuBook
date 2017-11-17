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
const pageModel = require('./server/modules/api/pages/pageModel.js');
const categoryModel = require('./server/modules/api/categories/categoryModel.js');

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
app.use(passport.session());

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
server.listen(config.port, () => {
  console.log(`App listen on ${config.port}`);
});

// categoryModel.createNewCategory("quan", ["quần", "jogger", "pants"], () => {});
// categoryModel.createNewCategory("giay", ["giầy", "shoes"], () => {});
// categoryModel.createNewCategory("tat", ["tất", "vớ", "sock", "socks"], () => {});
// categoryModel.createNewCategory("vi", ["ví", "wallet"], () => {});
// categoryModel.createNewCategory("kinh", ["kính", "glasses"], () => {});
// categoryModel.createNewCategory("balo", ["ba lô", "balô", "ba lo", "balo", "cặp", "túi"], () => {});
// categoryModel.createNewCategory("trang_suc", ["nhẫn", "dây chuyền", "khuyên tai", "vòng"], () => {});
// categoryModel.createNewCategory("ao", ["áo", "bomber", "hoodie", "jacket", "khoác"], () => {});

// pageModel.createNewPage("Torano", "torano.vn", ["ao", "quan"], () => {});
// pageModel.createNewPage("PartTime", "parttime.co", ["ao", "quan", "giay", "balo"], () => {});
// pageModel.createNewPage("Riverway", "RVSZRM", ["ao", "quan"], () => {});
// pageModel.createNewPage("AGOSTO", "agosto.store", ["ao", "quan"], () => {});
// pageModel.createNewPage("ZBROM", "zbromhanghieuxuatkhau", ["ao", "quan"], () => {});
// pageModel.createNewPage("OzHomeland", "ozhomelandstore", ["ao", "quan"], () => {});
// pageModel.createNewPage("UrbanStoreVN", "urbanstorevn", ["ao", "quan"], () => {});
// pageModel.createNewPage("MenEto", "Menetohn", ["ao", "quan"], () => {});
// pageModel.createNewPage("Valento", "thoitrangvalento", ["ao", "quan"], () => {});

setInterval(function() {
  postModel.updateDatabase();
}, 60 * 1000 * 1);

// app.listen(config.port , () => {
//   console.log(`App listen on ${config.port}`);
// })
