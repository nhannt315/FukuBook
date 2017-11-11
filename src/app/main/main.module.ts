import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRouterModule} from './main.routes';
import {FbpostService} from '../core/services/fbpost/fbpost.service';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MainRouterModule
  ],
  providers: [FbpostService],
  declarations: [MainComponent, SidebarComponent]
})
export class MainModule {
}
