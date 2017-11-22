import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutesModule} from './app.routes';
import {HttpModule} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import {AuthenticationService} from './core/services/authentication/authentication.service';
import {NotificationService} from './core/services/notification/notification.service';
import {AuthGuard} from './core/guards/auth.guard';
import {SharedService} from './core/services/shared/shared.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutesModule
  ],
  providers: [CookieService, AuthenticationService, NotificationService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
