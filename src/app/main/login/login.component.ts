import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';
import {User} from '../../core/models/models.component';
import {NotificationService} from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onLoginSuccess = new EventEmitter();
  @Input() isLogin = true;
  user: User;
  remember = false;
  userSignup: User;
  repeatPassword: String;
  isPassWordMatch = false;
  isLoadingLogin = false;
  isLoadingSignup = false;

  constructor(public authService: AuthenticationService, private notifyService: NotificationService) {
  }

  ngOnInit() {
    this.user = new User();
    this.userSignup = new User();
    this.isPassWordMatch = this.userSignup.password === this.repeatPassword;
  }

  login() {
    this.isLoadingLogin = true;
    this.authService.login(this.user.username, this.user.password, this.remember).subscribe(data => {
      this.onLoginSuccess.emit();
    }, error => {
      this.notifyService.printErrorMessage(error);
      this.isLoadingLogin = false;
    });
  }

  signUp() {
    if (this.repeatPassword !== this.userSignup.password) {
      return;
    }
    this.isLoadingSignup = true;
    this.authService.signUp(this.userSignup.username, this.userSignup.password).subscribe(data => {
      this.onLoginSuccess.emit();
    }, error => {
      this.notifyService.printErrorMessage(error);
      this.isLoadingSignup = false;
    });
  }
}
