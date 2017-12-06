import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap';
import {AuthenticationService} from '../core/services/authentication/authentication.service';
import {NotificationService} from '../core/services/notification/notification.service';
import {SharedService} from '../core/services/shared/shared.service';

declare const $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  @ViewChild('modalLoginSignup') public modalLoginSignup: ModalDirective;
  modalRef: BsModalRef;
  loadAPI: Promise<any>;
  isLogin = true;
  isChildLoading = false;

  constructor(public authService: AuthenticationService,
              private notifyService: NotificationService,
              private sharedService: SharedService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
    });
  }

  ngAfterViewInit(): void {
    this.modalLoginSignup.onHide.subscribe(() => {
      this.isChildLoading = false;
    });
    console.clear();
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

  openModal(template: TemplateRef<any>, login: boolean) {
    // this.modalRef = this.modalService.show(template);
    this.isLogin = login;
    this.modalLoginSignup.show();
  }


  loggedIn(event) {
    this.modalLoginSignup.hide();
    this.isChildLoading = false;
    this.notifyService.printSuccessMessage(event);
    this.sharedService.emitChange('LoggedIn');
  }

  logout() {
    this.authService.logout();
    this.isChildLoading = false;
    this.sharedService.emitChange('LoggedOut');
  }


}
