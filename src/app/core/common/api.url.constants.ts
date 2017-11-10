export class ApiUrlConstants {
  public static LOGIN = '';
  public static SIGN_UP = '';
  public static GET_ALL_POST = (page: number) => {
    return `post/all/${page}`;
  }

  public static GET_POST_BY_CATEGORY = (category: String, page: number) => {
    return `post/${category}/${page}`;
  }
  
}
