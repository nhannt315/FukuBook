export class ApiUrlConstants {
  public static DOMAIN = 'localhost:6969';
  public static LOGIN = `/user/login`;
  public static SIGN_UP = '';
  public static GET_ALL_POST = (page: number) => {
    return `/post/all?page={page}`;
  }

  public static GET_POST_BY_CATEGORY = (category: String, page: number) => {
    return `'post/${category}?page=${page}`;
  }

}
