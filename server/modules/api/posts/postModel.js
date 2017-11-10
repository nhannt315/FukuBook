const mongoose = require('mongoose');
const postSchema = require('./postSchema');
const postHelper = require('./postHelper');
const Fuse = require('fuse.js');

const postModel = mongoose.model('posts', postSchema);

const createNewPost = (newPost, callback) => {
  postModel.create(newPost, (err, doc) => {
    if (err) {
      console.log('createNewPost ERROR ', err);
    } else {
      callback(null, doc);
    }
  })
}

const deleteDatabase = () => {
  postModel.remove({}, function (err) {
    if (err) {
      console.log('deleteDatabase ERROR ', err);
    } else {
      console.log("Dropped database successfully");
    }
  })
}

const updateCollection = (listUrl, range) => {
  postHelper.getPostsOfMultiplePagesWithinRange(listUrl, range, (listData) => {
    console.log("listData ", listData);
    var options = {
      tokenize: true,
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "message"
      ]
    };
    var fuse = new Fuse(listData, options);
    var listDataShirts = fuse.search("áo shirts shirt");
    var listDataPants = fuse.search("quần pants pant");
    var listDataShoes = fuse.search("giày shoes shoe");
    var listDataSocks = fuse.search("tất sock");
    var listDataWallets = fuse.search("ví wallets wallet");
    var listDataGlasses = fuse.search("kính glasses glass");
    var listDataJewellery = fuse.search("vòng khuyên nhẫn lắc ring rings");
    deleteDatabase();
    createPostWithCategory(listDataPants, "quan");
    createPostWithCategory(listDataShirts, "ao");
    createPostWithCategory(listDataShoes, "giay");
    createPostWithCategory(listDataSocks, "tat");
    createPostWithCategory(listDataWallets, "vi");
    createPostWithCategory(listDataGlasses, "kinh");
    createPostWithCategory(listDataJewellery, "trang_suc");
  });
}

const createPostWithCategory = (list, category) => {
  list.forEach(function (item) {
    if (item.error) {
    } else if (!item.error) {
      let newPost = {
        id: item.id,
        permalink_url: item.permalink_url,
        likes: item.likes.summary.total_count,
        comments: item.comments.summary.total_count,
        category: category
      }
      createNewPost(newPost, (err, doc) => {
        if (err) {
          console.log('updateCollection ERROR ', err);
        } else {
        }
      });
    }
  })
}

const getPostsFromDBWithCategory = (category, page, callback) => {
  postModel.find({
    category: category
  }).skip((page - 1) * 12).limit(12).exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

const getAllPostsFromDB = (page, callback) => {
  postModel.find({}).skip((page - 1) * 12).limit(12).exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

const updateDatabase = () => {
  pageList = ['Torano.vn', 'parttime.co', 'RVSZRM', 'agosto.store', 'zbromhanghieuxuatkhau', 'ozhomelandstore', 'urbanstorevn', 'Menetohn', 'thoitrangvalento'];
  updateCollection(pageList, 7);
  console.log("updateDatabase successfully");
}

module.exports = {
  updateCollection,
  getPostsFromDBWithCategory,
  getAllPostsFromDB,
  updateDatabase
}
