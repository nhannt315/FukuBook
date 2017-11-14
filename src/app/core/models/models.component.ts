export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
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
