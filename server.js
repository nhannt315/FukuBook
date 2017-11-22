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

// categoryModel.createNewCategory("quan", "Quần", ["quần", "jogger", "pants"], () => {});
// categoryModel.createNewCategory("giay", "Giày dép", ["giầy", "shoes", "dép", "sandals", "xăng đan"], () => {});
// categoryModel.createNewCategory("tat", "Tất", ["tất", "vớ", "sock", "socks"], () => {});
// categoryModel.createNewCategory("vi", "Ví", ["ví", "wallet"], () => {});
// categoryModel.createNewCategory("kinh", "Kính", ["kính", "glasses"], () => {});
// categoryModel.createNewCategory("balo", "Balô", ["ba lô", "balô", "ba lo", "balo", "cặp", "túi"], () => {});
// categoryModel.createNewCategory("trang_suc", "Trang sức", ["nhẫn", "dây chuyền", "khuyên tai", "vòng"], () => {});
// categoryModel.createNewCategory("ao", "Áo", ["áo", "bomber", "hoodie", "jacket", "khoác"], () => {});

// pageModel.createNewPageWithCategoryName("torano.vn", "Torano", ["ao", "quan"], () => {});
// pageModel.createNewPageWithCategoryName("parttime.co", "Part Time", ["ao", "quan", "giay", "balo"], () => {});
// pageModel.createNewPageWithCategoryName("RVSZRM", "River Shop", ["ao", "quan"], () => {});
// pageModel.createNewPageWithCategoryName("agosto.store", "AGOSTO Store", ["ao", "quan"], () => {});
// pageModel.createNewPageWithCategoryName("zbromhanghieuxuatkhau", "ZBROM", ["ao", "quan"], () => {});
// pageModel.createNewPageWithCategoryName("ozhomelandstore", "Oz Homeland Store", ["ao", "quan"], () => {});
// pageModel.createNewPageWithCategoryName("urbanstorevn", "Urban Store", ["ao", "quan"], () => {});
// pageModel.createNewPageWithCategoryName("Menetohn", "MEN eto", ["ao", "quan"], () => {});
// pageModel.createNewPageWithCategoryName("thoitrangvalento", "Valento", ["ao", "quan"], () => {});

setInterval(function() {
  postModel.updateDatabase();
}, 60 * 1000 * 3);

// app.listen(config.port , () => {
//   console.log(`App listen on ${config.port}`);
// })
