import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoriteComponent} from './favorite.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', component: FavoriteComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FavoriteComponent]
})
export class FavoriteModule {
}
