export class User {
  username: String;
  password: String;
  favUrls: String[];
  postsFromFavUrls: String[];
  postId: String[];
  token: String;
}

export class Post {
  _id: String;
  id: String;
  permalink_url: String;
  likes: number;
  comments: number;
  category: String;
  __v: number;
  shares: number;
}

export class Category {
  _id: string;
  name: string;
  alias: string;
  keywords: string[];
}

export class Shop {
  _id: string;
  name: string;
  permalink_url: string;
  category: string[];
}
