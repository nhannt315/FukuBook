import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
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

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }


}
