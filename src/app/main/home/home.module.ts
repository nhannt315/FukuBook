import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';
import {PostService} from '../../core/services/post/post.service';
import {NotificationService} from '../../core/services/notification/notification.service';
import {CategoryService} from '../../core/services/category/category.service';

const routes: Routes = [
  {path: '', redirectTo: 'all', pathMatch: 'full'},
  {path: 'all', component: HomeComponent},
  {path: ':category', component: HomeComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthenticationService, PostService, NotificationService, CategoryService],
  declarations: [HomeComponent]
})
export class HomeModule {
}
