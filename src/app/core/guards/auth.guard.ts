import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SystemConstants} from '../common/system.constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem(SystemConstants.CURRENT_USER)
      && JSON.parse(localStorage.getItem(SystemConstants.CURRENT_USER)).admin) {
      return true;
    } else {
      this.router.navigate(['/404/']);
      return false;
    }
  }
}
