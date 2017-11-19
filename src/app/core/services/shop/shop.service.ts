import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
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

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


}
