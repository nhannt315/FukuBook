const getCategoryIdFromNameWithList = (listCategory, name) => {
  for (category in listCategory) {
    if (listCategory[category].name == name) {
      return listCategory[category]._id;
    }
  }
}

const getCategoryKeywordsFromId = (listCategory, id) => {
  // console.log("listCategory getCategoryKeywordsFromId:\n", listCategory);
  // console.log("id getCategoryKeywordsFromId:\n", id);
  for (category in listCategory) {
    // console.log("for loop listCategory[category]:\n", listCategory[category]);
    if (listCategory[category]._id.toString() == id.toString()) {
      return listCategory[category].keywords;
    }
  }
}

const cloneJSON = (obj) => {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj
  }
  if (obj instanceof Array) {
    var cloneA = [];
    for (var i = 0; i < obj.length; ++i) {
      cloneA[i] = cloneJSON(obj[i]);
    }
    return cloneA;
  }
  var cloneO = {};
  for (var i in obj) {
    cloneO[i] = cloneJSON(obj[i]);
  }
  return cloneO;
}

module.exports = {
  getCategoryIdFromNameWithList,
  getCategoryKeywordsFromId
}
