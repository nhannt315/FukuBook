const config = require('../../../config.json');
const FB = require('fb');

FB.setAccessToken(config.access_token);

const appendListToList = (list1, list2) => {
  list1 = list1.concat(list2);
  return list1;
}

const getPagePosts = (pageId, range, callback) => {
  var timeEnd = new Date().getTime();
  var timeStart = timeEnd - range * 86400000;
  FB.api(pageId + '/posts?fields=permalink_url,shares,likes.summary(true),comments.summary(true),message&since=' + parseInt(timeStart / 1000) + '&until=' + parseInt(timeEnd / 1000), (result) => {
    if (!result || result.error) {
      callback(result.error);
    } else {
      callback(result);
    }
  });
}

const isNote = (urlRaw) => {
  var urlParts = urlRaw.split("/");
  for (var i = 0; i < urlParts.length; i++) {
    if (urlParts[i] == "notes") {
      return 1;
    } else if (urlParts[i] == "events") {
      return 1;
    }
  };
  return 0;
}

const getPostsOfMultiplePagesWithinRange = (listPageId, range, callback) => {
  var timeEnd = new Date().getTime();
  var timeStart = timeEnd - range * 86400000;
  var listData = [];
  var len = listPageId.length - 1;

  listPageId.forEach(function(item) {
    FB.api(item + '/posts?fields=permalink_url,shares,likes.summary(true),comments.summary(true),message&limit=50&since=' + parseInt(timeStart / 1000) + '&until=' + parseInt(timeEnd / 1000), (result) => {
      if (!result || result.error) {
        console.log("getPostsOfMultiplePagesWithinRange ERROR ", result.error);
      } else {
        result.data.forEach(function(object) {
          if (isNote(`${object.permalink_url}`) == 1) {
            result.data.splice(result.data.indexOf(object), 1);
          } else if (!object.hasOwnProperty("permalink_url")) {
            var idParts = object.id.split("_");
            object.permalink_url = "https://www.facebook.com/" + item + "/posts/" + idParts[1];
          }
        });

        len--;
        listData = appendListToList(listData, result.data);
        if (len < 0) {
          callback(listData);
        }
      }
    })
  })
}

const getNameFromUrl = (urlRaw) => {
  var pageId;
  var urlParts = urlRaw.split("/");
  for (var i = 0; i < urlParts.length; i++) {
    if ((urlParts[i] !== "https:") && (urlParts[i] !== "") && (urlParts[i] !== "www.facebook.com") && (urlParts[i] !== "?fref=ts")) {
      pageId = urlParts[i];
    }
  };
  return pageId;
}

const getDataFromPageUrl = (urlRaw, callback) => {
  var pageId = getNameFromUrl(urlRaw);
  FB.api(pageId, (result) => {
    if (!result || result.error) {
      callback('getDataFromPageUrl ERROR');
    } else {
      callback(result);
    }
  })
}

const getPagePostsWithinRange = (pageId, range, callback) => {
  var timeEnd = new Date().getTime();
  var timeStart = timeEnd - range * 86400000;
  FB.api(pageId + '/posts?fields=permalink_url,shares,likes.summary(true),comments.summary(true),message&since=' + parseInt(timeStart / 1000) + '&until=' + parseInt(timeEnd / 1000), (result) => {
    if (!result || result.error) {
      callback(result.error);
    } else {
      callback(result);
    }
  });
}

const getPagePostsWithinRangeWithOrder = (pageId, range, order, callback) => {
  var timeEnd = new Date().getTime();
  var timeStart = timeEnd - range * 86400000;
  FB.api(pageId + '/posts?fields=permalink_url,shares,likes.summary(true),comments.summary(true),message&since=' + parseInt(timeStart / 1000) + '&until=' + parseInt(timeEnd / 1000), (result) => {
    if (!result || result.error) {
      callback(result.error);
    } else {
      switch (order) {
        case "likes":
          {
            sortPostsByLikes(result.data);
          }
          break;
        case "shares":
          {
            sortPostsByLikes(result.data);
          }
          break;
        case "comments":
          {
            sortPostsByComments(result.data);
          }
          break;
      }
      callback(result);
    }
  });
}

const getInteractionOfPost = (postId, callback) => {
  var total_interaction;
  FB.api(`/${postId}` + '/?fields=shares,likes.summary(true),comments.summary(true)', (interaction) => {
    if (!interaction.shares || interaction.shares.error) {
      total_interaction = interaction.likes.summary.total_count + interaction.comments.summary.total_count;
      callback(total_interaction);
    } else {
      total_interaction = interaction.likes.summary.total_count + interaction.comments.summary.total_count + interaction.shares.count;
      callback(total_interaction);
    }
  });
}

const compare = (a, b) => {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
}

const sortPostsByInteract = (postsList) => {
  for (var i = 0; i < postsList.length - 2; i++) {
    for (var j = i + 1; j < postsList.length - 1; j++) {
      var interactEl1 = postsList[i].likes.summary.total_count + postsList[i].comments.summary.total_count;
      var interactEl2 = postsList[j].likes.summary.total_count + postsList[j].comments.summary.total_count;
      if (compare(interactEl1, interactEl2) == -1) {
        var temp = postsList[i];
        postsList[i] = postsList[i + 1];
        postsList[i + 1] = temp;
      }
    }
  }
}

const sortPostsByLikes = (postsList) => {
  for (el1 in postsList) {
    for (el2 in postsList) {
      if (compare(postsList[el1]["likes"]["summary"]["total_count"], postsList[el2]["likes"]["summary"]["total_count"]) == 1) {
        var temp = postsList[el1];
        postsList[el1] = postsList[el2];
        postsList[el2] = temp;
      }
    }
  }
}

const sortPostsByShares = (postsList) => {
  for (el1 in postsList) {
    for (el2 in postsList) {
      if (compare(postsList[el1]["shares"]["count"], postsList[el2]["shares"]["count"]) == 1) {
        var temp = postsList[el1];
        postsList[el1] = postsList[el2];
        postsList[el2] = temp;
      }
    }
  }
}

const sortPostsByComments = (postsList) => {
  for (el1 in postsList) {
    for (el2 in postsList) {
      if (compare(postsList[el1]["comments"]["summary"]["total_count"], postsList[el2]["comments"]["summary"]["total_count"]) == 1) {
        var temp = postsList[el1];
        postsList[el1] = postsList[el2];
        postsList[el2] = temp;
      }
    }
  }
}

module.exports = {
  getPagePosts,
  getPagePostsWithinRange,
  getInteractionOfPost,
  getPagePostsWithinRangeWithOrder,
  getPostsOfMultiplePagesWithinRange,
  appendListToList,
  getDataFromPageUrl
}
