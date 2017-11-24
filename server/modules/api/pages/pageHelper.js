const getAllPageUrlFromList = (listPage) => {
  var listPageUrl = [];
  for (page in listPage) {
    listPageUrl.push(listPage[page].permalink_url);
  }
  return listPageUrl;
}

const getPageIdFromUrl = (listPage, url) => {
  var urlParts = url.split("/");
  if (urlParts[3] == undefined) {
    for (page in listPage) {
      if ((listPage[page].permalink_url).toLowerCase() == url.toLowerCase()) {
        return listPage[page]._id;
      }
    }
  } else {
    for (page in listPage) {
      if ((listPage[page].permalink_url).toLowerCase() == urlParts[3].toLowerCase()) {
        return listPage[page]._id;
      }
    }
  }
}

const getPageCategoryFromUrl = (listPage, url) => {
  var urlParts = url.split("/");
  var result = [];
  if (urlParts[3] == undefined) {
    for (page in listPage) {
      if ((listPage[page].permalink_url).toLowerCase() == url.toLowerCase()) {
        return listPage[page].category;
      }
    }
  } else {
    for (page in listPage) {
      if ((listPage[page].permalink_url).toLowerCase() == urlParts[3].toLowerCase()) {
        return listPage[page].category;
      }
    }
  }
}

module.exports = {
  getAllPageUrlFromList,
  getPageIdFromUrl,
  getPageCategoryFromUrl
}
