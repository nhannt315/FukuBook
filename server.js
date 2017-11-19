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
const pageApi = require('./server/modules/api/pages/pageController');
const categoryApi = require('./server/modules/api/categories/categoryController');

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
app.use('/page', pageApi);
app.use('/category', categoryApi);

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

// categoryModel.createNewCategory("Quần", "quan", ["quần", "jogger", "pants"], () => {});
// categoryModel.createNewCategory("Giày dép", "giay", ["giầy", "shoes", "dép", "sandals", "xăng đan"], () => {});
// categoryModel.createNewCategory("Tất", "tat", ["tất", "vớ", "sock", "socks"], () => {});
// categoryModel.createNewCategory("Ví", "vi", ["ví", "wallet"], () => {});
// categoryModel.createNewCategory("Kính", "kinh", ["kính", "glasses"], () => {});
// categoryModel.createNewCategory("Balô", "balo", ["ba lô", "balô", "ba lo", "balo", "cặp", "túi"], () => {});
// categoryModel.createNewCategory("Trang sức", "trang_suc", ["nhẫn", "dây chuyền", "khuyên tai", "vòng"], () => {});
// categoryModel.createNewCategory("Áo", "ao", ["áo", "bomber", "hoodie", "jacket", "khoác"], () => {});

// pageModel.createNewPage("Torano", "torano.vn", ["ao", "quan"], () => {});
// pageModel.createNewPage("Part Time", "parttime.co", ["ao", "quan", "giay", "balo"], () => {});
// pageModel.createNewPage("River Shop", "RVSZRM", ["ao", "quan"], () => {});
// pageModel.createNewPage("AGOSTO Store", "agosto.store", ["ao", "quan"], () => {});
// pageModel.createNewPage("ZBROM", "zbromhanghieuxuatkhau", ["ao", "quan"], () => {});
// pageModel.createNewPage("Oz Homeland Store", "ozhomelandstore", ["ao", "quan"], () => {});
// pageModel.createNewPage("Urban Store", "urbanstorevn", ["ao", "quan"], () => {});
// pageModel.createNewPage("MEN eto", "Menetohn", ["ao", "quan"], () => {});
// pageModel.createNewPage("Valento", "thoitrangvalento", ["ao", "quan"], () => {});

setInterval(function() {
  postModel.updateDatabase();
}, 60 * 1000 * 1);

// app.listen(config.port , () => {
//   console.log(`App listen on ${config.port}`);
// })
