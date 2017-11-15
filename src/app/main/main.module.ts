import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRouterModule} from './main.routes';
import {FbpostService} from '../core/services/fbpost/fbpost.service';
import {SidebarComponent} from './shared/sidebar/sidebar.component';
import {ModalModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    MainRouterModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [FbpostService],
  declarations: [MainComponent, SidebarComponent, LoginComponent]
})
export class MainModule {
}
