import {AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';
import {User} from '../../core/models/models.component';
import {NotificationService} from '../../core/services/notification/notification.service';
import {MessageConstants} from '../../core/common/message.constants';

declare const $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  @Output() onLoginSuccess = new EventEmitter();
  @Input() isLogin;

  user: User;
  remember = false;
  userSignup: User;
  repeatPassword: String;
  isPassWordMatch = false;
  isLoadingLogin = false;
  isLoadingSignup = false;

  constructor(public authService: AuthenticationService, private notifyService: NotificationService) {

  }

  ngAfterViewChecked(): void {
    if (this.isLogin) {
      $('#login-li').click();
    } else {
      $('#signup-li').click();
    }
  }

  ngOnInit() {
    this.user = new User();
    this.userSignup = new User();
    this.isPassWordMatch = this.userSignup.password === this.repeatPassword;
  }

  login() {
    if (!this.user.password || !this.user.username) {
      return;
    }
    this.isLoadingLogin = true;
    this.authService.login(this.user.username, this.user.password, this.remember).subscribe(data => {
      this.onLoginSuccess.emit(MessageConstants.LOGIN_SUCCESS);
    }, error => {
      this.notifyService.printErrorMessage(MessageConstants.LOGIN_FAILED);
      this.isLoadingLogin = false;
    });
  }

  signUp() {
    if (!this.userSignup.password || !this.userSignup.username || (this.repeatPassword !== this.userSignup.password)) {
      return;
    }
    this.isLoadingSignup = true;
    this.authService.signUp(this.userSignup.username, this.userSignup.password).subscribe(data => {
      this.onLoginSuccess.emit(MessageConstants.REGISTER_SUCCESS);
    }, error => {
      this.notifyService.printErrorMessage(MessageConstants.REGISTER_FAILED);
      this.isLoadingSignup = false;
    });
  }
}
