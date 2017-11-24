import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', loadChildren: './main/main.module#MainModule'},
  {path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard]},
  {path: '404', loadChildren: './notfound/notfound.module#NotfoundModule'},
  {path: '**', redirectTo: '404'}
];

export const AppRoutesModule = RouterModule.forRoot(routes);
