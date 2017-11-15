import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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
  user: User;
  remember = false;

  constructor(public authService: AuthenticationService, private notifyService: NotificationService) {
  }

  ngOnInit() {
    this.user = new User();
  }

  login() {
    this.authService.login(this.user.username, this.user.password, this.remember).subscribe(data => {
      this.onLoginSuccess.emit();
    }, error => this.notifyService.printErrorMessage(error));
  }
}
