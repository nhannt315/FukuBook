import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {ApiUrlConstants} from '../../common/api.url.constants';
import 'rxjs/add/operator/map'
import {Shop} from '../../models/models.component';

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

  public createNewShop(shop: Shop) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    const body = {
      name: shop.name,
      permalink_url: shop.permalink_url,
      category: shop.category
    };
    return this.http.post(ApiUrlConstants.CREATE_NEW_SHOP, body, {headers: headers})
      .map(this.extractData);
  }

  public updateShop(shopId: string, shop: Shop) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    const body = {
      name: shop.name,
      permalink_url: shop.permalink_url,
      category: shop.category
    };
    return this.http.put(ApiUrlConstants.UPDATE_SHOP(shopId), body, {headers: headers})
      .map(this.extractData);
  }

  public deleteShop(shopId: string) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    return this.http.delete(ApiUrlConstants.DELETE_SHOP(shopId), {headers: headers})
      .map(this.extractData);
  }


  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


}
