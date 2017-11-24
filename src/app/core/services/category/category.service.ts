import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {ApiUrlConstants} from '../../common/api.url.constants';
import 'rxjs/add/operator/map';
import {Category} from '../../models/models.component';

@Injectable()
export class CategoryService {

  constructor(private http: Http,
              private authService: AuthenticationService) {
  }

  public getAllCategory() {
    return this.http
      .get(ApiUrlConstants.GET_ALL_CATEGORY)
      .map(this.extractData);
  }

  public addNewCategory(category: Category) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    const body = {
      name: category.name,
      alias: category.alias,
      keywords: category.keywords
    };
    return this.http.post(ApiUrlConstants.CREATE_NEW_CATEGORY, body, {headers: headers})
      .map(this.extractData);
  }

  public getCategoryDetailByName(name: string) {
    return this.http.get(ApiUrlConstants.GET_CATEGORY_DETAIL(name))
      .map(this.extractData);
  }

  public updateCategory(category: Category) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    const body = {
      name: category.name,
      alias: category.alias,
      keywords: category.keywords
    };
    return this.http.put(ApiUrlConstants.UPDATE_CATEGORY(category._id), body, {headers: headers})
      .map(this.extractData);
  }

  public deleteCategory(categoryId: string) {
    const headers = new Headers();
    headers.append('Authorization', 'JWT ' + this.authService.getCurrentUser().token);
    return this.http.delete(ApiUrlConstants.UPDATE_CATEGORY(categoryId), {headers: headers})
      .map(this.extractData);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

}
