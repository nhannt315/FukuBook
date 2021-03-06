import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: './home/home.module#HomeModule'},
      {path: 'favorite', loadChildren: './favorite/favorite.module#FavoriteModule'},
      {path: 'search', loadChildren: './search/search.module#SearchModule'}
    ]
  },
];

export const MainRouterModule = RouterModule.forChild(routes);
