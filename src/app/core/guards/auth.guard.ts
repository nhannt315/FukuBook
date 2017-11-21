import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../services/authentication/authentication.service';
import {MessageConstants} from '../common/message.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private notifyService) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.notifyService.printErrorMessage(MessageConstants.LOGIN_REQUIRED);
      return false;
    }
  }
}
