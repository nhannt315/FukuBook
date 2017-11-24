import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminRouterModule} from './admin.routes';
import {AuthenticationService} from '../core/services/authentication/authentication.service';
import {CategoryService} from '../core/services/category/category.service';
import {ShopService} from '../core/services/shop/shop.service';
import {NotificationService} from '../core/services/notification/notification.service';
import {ModalModule} from 'ngx-bootstrap';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminRouterModule,
    ModalModule.forRoot(),
    MultiselectDropdownModule,
    FormsModule
  ],
  providers: [AuthenticationService, CategoryService, ShopService, NotificationService],
  declarations: [AdminComponent]
})
export class AdminModule {
}
