import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {ApiUrlConstants} from '../../common/api.url.constants';
import 'rxjs/add/operator/map'

@Injectable()
export class ShopService {
  constructor(private http: Http,
              private authService: AuthenticationService) {
  }

  public getAllShop() {
    return this.http
      .get(ApiUrlConstants.GET_ALL_SHOP)
      .map(this.extractData);
  }

  public saveFavoriteUrl(url: String) {
    const headers = new Headers();
    headers.append('Authorization', this.authService.getCurrentUser().token);
    const body = {
      url: url
    };
    return this.http.post(ApiUrlConstants.SAVE_FAVORITE_PAGE, body, {headers: headers}).map(this.extractData);
  }

  public getFavoritesUrls() {
    const headers = new Headers();
    headers.append('Authorization', this.authService.getCurrentUser().token);
    return this.http.get(ApiUrlConstants.GET_FAVORITE_PAGES, {headers: headers}).map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


}
