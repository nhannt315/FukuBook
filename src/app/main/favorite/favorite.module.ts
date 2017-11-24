import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoriteComponent} from './favorite.component';
import {RouterModule, Routes} from '@angular/router';
import {NotificationService} from '../../core/services/notification/notification.service';
import {PostService} from '../../core/services/post/post.service';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';

const routes: Routes = [
  {path: '', component: FavoriteComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [AuthenticationService, PostService, NotificationService],
  declarations: [FavoriteComponent]
})
export class FavoriteModule {
}
