import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopComponent} from './shop.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {MultiselectDropdownModule} from 'angular-2-dropdown-multiselect';

const routes: Routes = [
  {path: '', component: ShopComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MultiselectDropdownModule
  ],
  declarations: [ShopComponent]
})
export class ShopModule { }
