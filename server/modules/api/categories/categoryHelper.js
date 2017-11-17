const getCategoryIdFromNameWithList = (listCategory, name) => {
  for (category in listCategory) {
    if (listCategory[category].name == name) {
      return listCategory[category]._id;
    }
  }
}

const getCategoryKeywordsFromID = (listCategory, id) => {
  for (category in listCategory) {
    // console.log("listCategory[category]._id:\n", listCategory[category]._id);
    if (listCategory[category]._id.toString() === id.toString()) {
      return listCategory[category].keywords;
    }
  }
}

module.exports = {
  getCategoryIdFromNameWithList,
  getCategoryKeywordsFromID
}
