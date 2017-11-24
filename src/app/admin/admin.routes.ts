import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      {path: 'category', loadChildren: './category/category.module#CategoryModule'},
      {path: 'shop', loadChildren: './shop/shop.module#ShopModule'},
      {path: '', redirectTo: 'category'}
    ]
  }
];

export const AdminRouterModule = RouterModule.forChild(routes);
