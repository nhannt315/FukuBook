import {UtilityService} from './utility.service';
import {NotificationService} from './notification.service';
import {MessageConstants} from './../common/message.constants';
import {SystemConstants} from './../common/system.constants';
import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {AuthenticationService} from './authentication.service';

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

}
