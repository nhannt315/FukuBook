import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryComponent} from './category.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UtilityService} from '../../core/services/utility/utility.service';
import {TagInputModule} from 'ngx-chips';

const routes: Routes = [
  {path: '', component: CategoryComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TagInputModule

  ],
  providers: [UtilityService],
  declarations: [CategoryComponent]
})
export class CategoryModule {
}
