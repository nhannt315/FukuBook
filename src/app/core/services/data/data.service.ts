import {UtilityService} from '../utility/utility.service';
import {NotificationService} from '../notification/notification.service';
import {MessageConstants} from '../../common/message.constants';
import {SystemConstants} from '../../common/system.constants';
import {Headers, Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class DataService {

  private headers: Headers;

  constructor(private http: Http,
              private router: Router,
              private authService: AuthenticationService,
              private notifyService: NotificationService,
              private utilService: UtilityService) {
    this.headers = new Headers();
    this.headers.append('Content-type', 'application/json');
  }

  get(uri: string) {

  }

  public handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this.notifyService.printErrorMessage(MessageConstants.LOGIN_AGAIN_MSG);
    } else {
      const errMsg = JSON.parse(error._body).errmsg || JSON.parse(error._body).message;
      this.notifyService.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }
  }

}
