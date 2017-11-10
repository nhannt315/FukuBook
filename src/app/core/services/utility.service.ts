import { Injectable } from '@angular/core';
import {UrlConstants} from '../common/url.constants';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UtilityService {

    private _router: Router;

    constructor(router: Router, private http: Http, private auth: AuthenticationService) {
        this._router = router;
    }

    convertDateTime(date: Date) {
        const _formattedDate = new Date(date.toString());
        return _formattedDate.toDateString();
    }

    navigate(path: string) {
        this._router.navigate([path]);
    }

    navigateToLogin() {
        this._router.navigate([UrlConstants.LOGIN]);
    }

}
