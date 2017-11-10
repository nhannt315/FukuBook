import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', loadChildren: './main/main.module#MainModule'},
];

export const AppRoutesModule = RouterModule.forRoot(routes);
