import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {AuthenticationService} from '../core/services/authentication/authentication.service';
import {NotificationService} from '../core/services/notification/notification.service';
import {SharedService} from '../core/services/shared/shared.service';

declare const $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('modalLoginSignup') modalLoginSignup: ModalDirective;

  loadAPI: Promise<any>;
  isLogin = true;

  constructor(public authService: AuthenticationService,
              private notifyService: NotificationService,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
    });
  }

  public loadScript() {

    this.addScript('/assets/js/homepage.js');
    this.addScript('/assets/js/login.js');

  }

  addScript(path: string) {
    const node = document.createElement('script');
    node.src = path;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

  showLoginModal() {
    this.isLogin = true;
    this.modalLoginSignup.show();
  }

  showSignupModal() {
    this.isLogin = false;
    this.modalLoginSignup.show();
  }

  loggedIn(event) {
    this.modalLoginSignup.hide();
    this.notifyService.printSuccessMessage(event);
    this.sharedService.emitChange('LoggedIn');
  }

  logout() {
    this.authService.logout();
    this.sharedService.emitChange('LoggedOut');
  }


}
