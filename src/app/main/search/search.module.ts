import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search.component';
import {RouterModule, Routes} from '@angular/router';
import {CategoryService} from '../../core/services/category/category.service';
import {ShopService} from '../../core/services/shop/shop.service';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';
import {FormsModule} from '@angular/forms';
import {PostService} from '../../core/services/post/post.service';
import {FbpostService} from '../../core/services/fbpost/fbpost.service';

const routes: Routes = [
  {path: '', component: SearchComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MultiselectDropdownModule,
    FormsModule
  ],
  providers: [CategoryService, ShopService, PostService, FbpostService],
  declarations: [SearchComponent]
})
export class SearchModule {
}
