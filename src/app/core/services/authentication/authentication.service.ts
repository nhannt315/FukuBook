import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {SystemConstants} from '../../common/system.constants';
import {ApiUrlConstants} from '../../common/api.url.constants';
import 'rxjs/add/operator/map';
import {User} from '../../models/models.component';

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) {
  }

  login(username: string, password: string, remember: boolean) {
    const body = {
      username: username,
      password: password,
      remember: remember
    };

    return this.http.post(ApiUrlConstants.LOGIN, body)
      .map((response: Response) => {
        const user: User = response.json();
        if (user && user.token) {
          localStorage.removeItem(SystemConstants.CURRENT_USER);
          localStorage.setItem(SystemConstants.CURRENT_USER, JSON.stringify(user));
        }
      });
  }

  logout() {
  }


  isAuthenticated(): boolean {
    const user = localStorage.getItem(SystemConstants.CURRENT_USER);
    return !!user;
  }

}
