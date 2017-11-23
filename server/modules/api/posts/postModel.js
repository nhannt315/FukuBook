const mongoose = require('mongoose');
const postSchema = require('./postSchema');
const postHelper = require('./postHelper');
const categoryModel = require('../categories/categoryModel.js');
const categoryHelper = require('../categories/categoryHelper.js');
const pageModel = require('../pages/pageModel.js');
const pageHelper = require('../pages/pageHelper.js');
const Fuse = require('fuse.js');

const postModel = mongoose.model('posts', postSchema);

const createNewPost = (newPost, callback) => {
  postModel.create(newPost, (err, doc) => {
    if (err) {
      callback(err);
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
  console.log(listUrl);
  postHelper.getPostsOfMultiplePagesWithinRange(listUrl, range, (listData) => {
    categoryModel.getAllCategoriesFromDB((err, listCategory) => {
      pageModel.getAllPagesFromDB((err, listPage) => {
        deleteDatabase();
        createPostWithCategory(listData, listCategory, listPage);
      });
    });
  });
}

const createPostWithCategory = (listData, listCategory, listPage) => {
  listData.forEach(function(item) {
    if (item.error) {} else if (!item.error) {
      var pageId = pageHelper.getPageIdFromUrl(listPage, item.permalink_url);
      var pageCategory = pageHelper.getPageCategoryFromUrl(listPage, item.permalink_url);
      var categoryId = [];
      // console.log("pageId:\n", pageId);
      // console.log("pageCategory:\n", pageCategory);
      // console.log("pageCategory.length:\n", pageCategory.length);
      if (pageCategory.length == 1) {
        categoryId.push(pageCategory[0]);
      } else if (pageCategory.length > 1) {
        for (i = 0; i < pageCategory.length; i++) {
          // console.log("pageCategory[category]:\n", pageCategory[i]);
          var keywords = categoryHelper.getCategoryKeywordsFromId(listCategory, pageCategory[i]);
          // console.log("pageCategory[category] after keywords:\n", pageCategory[i]);
          // console.log("keywords:\n", keywords);
          for (j = 0; j < keywords.length; j++) {
            if (item.message != undefined && item.message.includes(keywords[j])) {
              // console.log("Found Match\n");
              // console.log("Pushing category: ", pageCategory[i]);
              categoryId.push(pageCategory[i]);
              break;
            }
          }
        }
      }
      // console.log("categoryId:\n", categoryId);
      if (categoryId.length > 0) {
        var newPost;
        if (item.hasOwnProperty("shares")) {
          newPost = {
            fb_id: item.id,
            permalink_url: item.permalink_url,
            likes: item.likes.summary.total_count,
            comments: item.comments.summary.total_count,
            message: item.message,
            category: categoryId,
            shares: item.shares.count,
            page: pageId
          }
        } else {
          newPost = {
            fb_id: item.id,
            permalink_url: item.permalink_url,
            likes: item.likes.summary.total_count,
            comments: item.comments.summary.total_count,
            message: item.message,
            category: categoryId,
            page: pageId
          }
        }
        createNewPost(newPost, (err, doc) => {
          if (err) {
            console.log('updateCollection ERROR ', err);
          } else {}
        });
      }
    }
  });
}

const getPostsFromDBWithPageWithLimit = (page, limit, callback) => {
  console.log("getPostsFromDBWithPageWithLimit");
  if (page == 0 && limit == 0) {
    getAllPostsFromDB(callback);
    return;
  } else {
    if (page == 0) page = 1;
    if (limit == 0) limit = 12;
    postModel.find({}).skip((page - 1) * limit).limit(limit).lean().exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getPostsFromDBWithPageWithLimitWithShop = (page, limit, shop, callback) => {
  console.log("getPostsFromDBWithPageWithLimitWithShop");
  if (shop == null) {
    getPostsFromDBWithPageWithLimit(page, limit, callback);
    return;
  }
  if (page == 0 && limit == 0) {
    getAllPostsFromDBWithShop(shop, callback);
  } else {
    pageModel.getAllPagesFromDB((err, listPage) => {
      if (page == 0) page = 1;
      if (limit == 0) limit = 12;
      var pageId = pageHelper.getPageIdFromUrl(listPage, shop);
      postModel.find({
        page: pageId
      }).skip((page - 1) * limit).limit(limit).lean().exec((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    })
  }
}

const getPostsFromDBWithCategoryWithPageWithLimit = (category, page, limit, callback) => {
  console.log("getPostsFromDBWithCategoryWithPageWithLimit");
  if (category == "all") {
    getPostsFromDBWithPageWithLimit(page, limit, callback);
    return;
  }
  if (page == 0 && limit == 0) {
    getAllPostsFromDBWithCategory(category, callback);
  } else {
    categoryModel.getAllCategoriesFromDB((err, listCategory) => {
      if (page == 0) page = 1;
      if (limit == 0) limit = 12;
      var categoryId = categoryHelper.getCategoryIdFromNameWithList(listCategory, category);
      postModel.find({
        category: categoryId
      }).skip((page - 1) * limit).limit(limit).lean().exec((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    });
  }
}

const getPostsFromDBWithCategoryWithPageWithLimitWithShop = (category, page, limit, shop, callback) => {
  console.log("getPostsFromDBWithCategoryWithPageWithLimitWithShop");
  if (category == "all") {
    getPostsFromDBWithPageWithLimitWithShop(page, limit, shop, callback);
    return;
  }
  if (shop == null) {
    getPostsFromDBWithCategoryWithPageWithLimit(category, page, limit, callback);
    return;
  }
  if (page == 0 && limit == 0) {
    getAllPostsFromDBWithCategoryWithShop(category, shop, callback);
  } else {
    categoryModel.getAllCategoriesFromDB((err, listCategory) => {
      pageModel.getAllPagesFromDB((err, listPage) => {
        if (page == 0) page = 1;
        if (limit == 0) limit = 12;
        var categoryId = categoryHelper.getCategoryIdFromNameWithList(listCategory, category);
        var pageId = pageHelper.getPageIdFromUrl(listPage, shop);
        postModel.find({
          category: categoryId,
          page: pageId
        }).skip((page - 1) * limit).limit(limit).lean().exec((err, result) => {
          if (err) {
            callback(err);
          } else {
            callback(null, result);
          }
        });
      });
    });
  }
}

const getPostsFromDBWithFilterWithPageWithLimit = (filter, page, limit, callback) => {
  console.log("getPostsFromDBWithFilterWithPageWithLimit");
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
    }).skip((page - 1) * limit).limit(limit).lean().exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getPostsFromDBWithFilterWithPageWithLimitWithShop = (filter, page, limit, shop, callback) => {
  console.log("getPostsFromDBWithFilterWithPageWithLimitWithShop");
  if (filter == null) {
    getPostsFromDBWithPageWithLimitWithShop(page, limit, shop, callback);
    return;
  }
  if (shop == null) {
    getPostsFromDBWithFilterWithPageWithLimit(filter, page, limit, callback);
    return;
  }
  if (page == 0 && limit == 0) {
    getAllPostsFromDBWithFilterWithShop(filter, shop, callback);
  } else {
    pageModel.getAllPagesFromDB((err, listPage) => {
      if (page == 0) page = 1;
      if (limit == 0) limit = 12;
      var pageId = pageHelper.getPageIdFromUrl(listPage, shop);
      postModel.find({
        $text: {
          $search: filter
        },
        page: pageId
      }).skip((page - 1) * limit).limit(limit).lean().exec((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    });
  }
}

const getPostsFromDBWithCategoryWithFilterWithPageWithLimit = (category, filter, page, limit, callback) => {
  console.log("getPostsFromDBWithCategoryWithFilterWithPageWithLimit");
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
    categoryModel.getAllCategoriesFromDB((err, listCategory) => {
      if (page == 0) page = 1;
      if (limit == 0) limit = 12;
      var categoryId = categoryHelper.getCategoryIdFromNameWithList(listCategory, category);
      postModel.find({
        $text: {
          $search: filter
        },
        category: categoryId
      }).skip((page - 1) * limit).limit(limit).lean().exec((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    });
  }
}

const getPostsFromDBWithCategoryWithFilterWithPageWithLimitWithShop = (category, filter, page, limit, shop, callback) => {
  console.log("getPostsFromDBWithCategoryWithFilterWithPageWithLimitWithShop");
  if (category == "all") {
    getPostsFromDBWithFilterWithPageWithLimitWithShop(filter, page, limit, shop, callback);
    return;
  }
  if (filter == null) {
    getPostsFromDBWithCategoryWithPageWithLimitWithShop(category, page, limit, shop, callback);
    return;
  }
  if (shop == null) {
    getPostsFromDBWithCategoryWithFilterWithPageWithLimit(category, filter, page, limit, callback);
    return;
  }
  if (page == 0 && limit == 0) {
    getAllPostsFromDBWithCategoryWithFilterWithShop(category, filter, shop, callback);
  } else {
    categoryModel.getAllCategoriesFromDB((err, listCategory) => {
      pageModel.getAllPagesFromDB((err, listPage) => {
        if (page == 0) page = 1;
        if (limit == 0) limit = 12;
        var categoryId = categoryHelper.getCategoryIdFromNameWithList(listCategory, category);
        var pageId = pageHelper.getPageIdFromUrl(listPage, shop);
        postModel.find({
          $text: {
            $search: filter
          },
          category: categoryId,
          page: pageId
        }).skip((page - 1) * limit).limit(limit).lean().exec((err, result) => {
          if (err) {
            callback(err);
          } else {
            callback(null, result);
          }
        });
      });
    });
  }
}

const getAllPostsFromDB = (callback) => {
  console.log("getAllPostsFromDB");
  postModel.find({}).lean().exec((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

const getAllPostsFromDBWithShop = (shop, callback) => {
  console.log("getAllPostsFromDBWithShop");
  if (shop == null) {
    getAllPostsFromDB(callback);
    return;
  } else {
    pageModel.getAllPagesFromDB((err, listPage) => {
      var pageId = pageHelper.getPageIdFromUrl(listPage, shop);
      postModel.find({
        page: pageId
      }).lean().exec((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    })
  }
}

const getAllPostsFromDBWithCategory = (category, callback) => {
  console.log("getAllPostsFromDBWithCategory");
  if (category == "all") {
    getAllPostsFromDB(callback);
  } else {
    categoryModel.getAllCategoriesFromDB((err, listCategory) => {
      var categoryId = categoryHelper.getCategoryIdFromNameWithList(listCategory, category);
      postModel.find({
        category: categoryId
      }).lean().exec((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    });
  }
}

const getAllPostsFromDBWithCategoryWithShop = (category, shop, callback) => {
  console.log("getAllPostsFromDBWithCategoryWithShop");
  if (shop == null) {
    getAllPostsFromDBWithCategory(category, callback);
    return;
  }
  if (category == "all") {
    getAllPostsFromDBWithShop(shop, callback);
  } else {
    categoryModel.getAllCategoriesFromDB((err, listCategory) => {
      pageModel.getAllPagesFromDB((err, listPage) => {
        var categoryId = categoryHelper.getCategoryIdFromNameWithList(listCategory, category);
        var pageId = pageHelper.getPageIdFromUrl(listPage, shop);
        postModel.find({
          category: categoryId,
          page: pageId
        }).lean().exec((err, result) => {
          if (err) {
            callback(err);
          } else {
            callback(null, result);
          }
        });
      });
    });
  }
}

const getAllPostsFromDBWithFilter = (filter, callback) => {
  console.log("getAllPostsFromDBWithFilter");
  if (filter == null) {
    getAllPostsFromDB(callback);
  } else {
    postModel.find({
      $text: {
        $search: filter
      }
    }).lean().exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

const getAllPostsFromDBWithFilterWithShop = (filter, shop, callback) => {
  console.log("getAllPostsFromDBWithFilterWithShop");
  if (shop == null) {
    getAllPostsFromDBWithFilter(filter, callback);
    return;
  }
  if (filter == null) {
    getAllPostsFromDBWithShop(shop, callback);
  } else {
    pageModel.getAllPagesFromDB((err, listPage) => {
      var pageId = pageHelper.getPageIdFromUrl(listPage, shop);
      postModel.find({
        $text: {
          $search: filter
        },

      }).lean().exec((err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    })
  }
}

const getAllPostsFromDBWithCategoryWithFilter = (category, filter, callback) => {
  console.log("getAllPostsFromDBWithCategoryWithFilter");
  categoryModel.getAllCategoriesFromDB((err, listCategory) => {
    var categoryId = categoryHelper.getCategoryIdFromNameWithList(listCategory, category);
    postModel.find({
      $text: {
        $search: filter
      },
      category: categoryId
    }).lean().exec((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  });
}

const getAllPostsFromDBWithCategoryWithFilterWithShop = (category, filter, shop, callback) => {
  console.log("getAllPostsFromDBWithCategoryWithFilterWithShop");
  if (shop == null) {
    getAllPostsFromDBWithCategoryWithFilter(category, filter, callback);
    return;
  } else {
    categoryModel.getAllCategoriesFromDB((err, listCategory) => {
      pageModel.getAllPagesFromDB((err, listPage) => {
        var categoryId = categoryHelper.getCategoryIdFromNameWithList(listCategory, category);
        var pageId = pageHelper.getPageIdFromUrl(listPage, shop);
        postModel.find({
          $text: {
            $search: filter
          },
          category: categoryId,
          page: pageId
        }).lean().exec((err, result) => {
          if (err) {
            callback(err);
          } else {
            callback(null, result);
          }
        });
      });
    });
  }
}

const updateDatabase = () => {
  pageModel.getAllPagesFromDB((err, listPage) => {
    var listPageUrl = pageHelper.getAllPageUrlFromList(listPage);
    updateCollection(listPageUrl, 30);
    console.log("updateDatabase SUCCESS");
  });
}

const deletePostById = (id, callback) => {
  postModel.remove({
    id: id
  }, function(err, doc) {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const updatePostById = (id, fields, callback) => {
  postModel.findOneAndUpdate({
    id: id
  }, fields, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
}

const getPostById = (id, callback) => {
  postModel.findOne({
    _id: id
  }, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  })
}

module.exports = {
  getAllPostsFromDBWithCategory,
  getPostsFromDBWithCategoryWithFilterWithPageWithLimitWithShop,
  updateDatabase,
  deletePostById,
  updatePostById,
  createNewPost,
  getPostById
}
