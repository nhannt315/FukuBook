import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', loadChildren: './main/main.module#MainModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
  {path: '404', loadChildren: './notfound/notfound.module#NotfoundModule'},
  {path: '**', redirectTo: '404'}
];

export const AppRoutesModule = RouterModule.forRoot(routes);
