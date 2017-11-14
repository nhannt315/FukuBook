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
  postModel.remove({}, function(err) {
    if (err) {
      console.log('deleteDatabase ERROR ', err);
    } else {
      console.log("deleteDatabase SUCCESS");
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
  list.forEach(function(item) {
    if (item.error) {} else if (!item.error) {
      let newPost;
      if (item.hasOwnProperty("shares")) {
        newPost = {
          id: item.id,
          permalink_url: item.permalink_url,
          likes: item.likes.summary.total_count,
          comments: item.comments.summary.total_count,
          message: item.message,
          category: category,
          shares: item.shares.count
        }
      } else {
        newPost = {
          id: item.id,
          permalink_url: item.permalink_url,
          likes: item.likes.summary.total_count,
          comments: item.comments.summary.total_count,
          message: item.message,
          category: category
        }
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

const getPostsFromDBWithPageWithLimit = (page, limit, callback) => {
  if (page == 0 && limit == 0) {
    getAllPostsFromDB(callback);
  } else {
    if (page == 0) page = 1;
    if (limit == 0) limit = 12;
    postModel.find({}).skip((page - 1) * limit).limit(limit).exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getPostsFromDBWithCategoryWithPageWithLimit = (category, page, limit, callback) => {
  if (category == "all") {
    getPostsFromDBWithPageWithLimit(page, limit, callback);
    return;
  }
  if (page == 0 && limit == 0) {
    getAllPostsFromDBWithCategory(category, callback);
  } else {
    if (page == 0) page = 1;
    if (limit == 0) limit = 12;
    postModel.find({
      category: category
    }).skip((page - 1) * limit).limit(limit).exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getPostsFromDBWithFilterWithPageWithLimit = (filter, page, limit, callback) => {
  if (filter == null) {
    getPostsFromDBWithPageWithLimit(page, limit, callback);
    return;
  }
  if (page == 0 && limit == 0) {
    getAllPostsFromDBWithFilter(filter, callback);
  } else {
    if (page == 0) page = 1;
    if (limit == 0) limit = 12;
    postModel.find({
      $text: {
        $search: filter
      }
    }).skip((page - 1) * limit).limit(limit).exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getPostsFromDBWithCategoryWithFilterWithPageWithLimit = (category, filter, page, limit, callback) => {
  if (category == "all") {
    getPostsFromDBWithFilterWithPageWithLimit(filter, page, limit, callback);
    return;
  }
  if (filter == null) {
    getPostsFromDBWithCategoryWithPageWithLimit(category, page, limit, callback);
    return;
  }
  if (page == 0 && limit == 0) {
    getAllPostsFromDBWithCategoryWithFilter(category, filter, callback);
  } else {
    if (page == 0) page = 1;
    if (limit == 0) limit = 12;
    postModel.find({
      $text: {
        $search: filter
      },
      category: category
    }).skip((page - 1) * limit).limit(limit).exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getAllPostsFromDB = (callback) => {
  postModel.find({}).exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

const getAllPostsFromDBWithCategory = (category, callback) => {
  if (category == "all") {
    getAllPostsFromDB(callback);
  } else {
    postModel.find({
      category: category
    }).skip().exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getAllPostsFromDBWithFilter = (filter, callback) => {
  if (filter == null) {
    getAllPostsFromDB(callback);
  } else {
    postModel.find({
      $text: {
        $search: filter
      }
    }).exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getAllPostsFromDBWithCategoryWithFilter = (category, filter, callback) => {
  postModel.find({
    $text: {
      $search: filter
    },
    category: category
  }).exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
}

const updateDatabase = () => {
  pageList = ['Torano.vn', 'parttime.co', 'RVSZRM', 'agosto.store', 'zbromhanghieuxuatkhau', 'ozhomelandstore', 'urbanstorevn', 'Menetohn', 'thoitrangvalento'];
  updateCollection(pageList, 7);
  console.log("updateDatabase SUCCESS");
}

module.exports = {
  updateCollection,
  getAllPostsFromDB,
  getPostsFromDBWithPageWithLimit,
  getAllPostsFromDBWithFilter,
  getPostsFromDBWithFilterWithPageWithLimit,
  getAllPostsFromDBWithCategory,
  getPostsFromDBWithCategoryWithPageWithLimit,
  getAllPostsFromDBWithCategoryWithFilter,
  getPostsFromDBWithCategoryWithFilterWithPageWithLimit,
  updateDatabase
}
