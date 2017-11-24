import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {ApiUrlConstants} from '../../common/api.url.constants';

import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  constructor(private http: Http,
              private authService: AuthenticationService) {
  }

  public getAllPost(page: number) {
    return this.http
      .get(ApiUrlConstants.GET_ALL_POST(page))
      .map(this.extractData);
  }

  public getPostByCategory(category: String, page: number) {
    return this.http
      .get(ApiUrlConstants.GET_POST_BY_CATEGORY(category, page))
      .map(this.extractData);
  }

  public searchPost(keyword: String, shop: String, category: String, page: number, pageSize: number) {
    return this.http
      .get(ApiUrlConstants.SEARCH_POST(keyword, shop, category, page, pageSize))
      .map(this.extractData);
  }

  public getUserFavoritePostsUrl() {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    return this.http
      .get(ApiUrlConstants.GET_FAVORITE_POSTS_URL, {headers: headers})
      .map(this.extractData);
  }

  public getUserFavoritePosts(page: number) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    return this.http
      .get(ApiUrlConstants.GET_FAVORITE_POSTS(page), {headers: headers})
      .map(this.extractData);
  }


  public saveFavoritePost(postUrl: String) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    const body = {
      post: postUrl
    };
    return this.http
      .post(ApiUrlConstants.SAVE_FAVORITE_POST, body, {headers: headers})
      .map(this.extractData);
  }

  public deleteFavoritePost(postUrl: String) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    const body = {
      post: postUrl
    };
    return this.http.post(ApiUrlConstants.DELETE_FAVORITE_POST, body, {headers: headers})
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


}
