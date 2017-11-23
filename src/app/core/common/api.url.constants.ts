export class ApiUrlConstants {
  public static DOMAIN = 'localhost:6969';
  public static LOGIN = `/user/login`;
  public static SIGN_UP = '/user/register';
  public static GET_ALL_CATEGORY = '/category/all';
  public static GET_ALL_SHOP = '/page/all';
  public static SAVE_FAVORITE_PAGE = '/saveFavUrl';
  public static GET_FAVORITE_PAGES = '/getFavUrls';
  public static GET_FAVORITE_POSTS_URL = '/user/getPostsURL';
  public static SAVE_FAVORITE_POST = '/user/savePost';
  public static DELETE_FAVORITE_POST = '/user/deletePost';
  public static CREATE_NEW_SHOP = '/page/';
  public static CREATE_NEW_CATEGORY = '/category/';
  public static UPDATE_CATEGORY = (categoryId: string) => {
    return `/category/${categoryId}`;
  }
  public static UPDATE_SHOP = (url: String) => {
    return `/page/${url}`;
  }
  public static DELETE_SHOP = (url: String) => {
    return `/page/${url}`;
  }
  public static GET_FAVORITE_POSTS = (page: number) => {
    return `/user/getPosts/${page}`;
  }
  public static GET_ALL_POST = (page: number) => {
    return `/post/all?page={page}`;
  }

  public static GET_POST_BY_CATEGORY = (category: String, page: number) => {
    return `/post/${category}?page=${page}`;
  }

  public static SEARCH_POST = (keyword: String, shop: String, category: String, page: number, limit: number) => {
    if (category == null || category.length === 0) {
      category = 'all';
    }
    let url = `/post/${category}?page=${page}&limit=${limit}`;

    if (keyword != null && keyword.length !== 0) {
      url += `&filter=${keyword}`;
    }
    if (shop != null && shop.length !== 0) {
      url += `&shop=${shop}`;
    }
    return url;
  }


}
