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
