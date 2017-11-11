import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRouterModule} from './main.routes';
import {FbpostService} from '../core/services/fbpost/fbpost.service';

@NgModule({
  imports: [
    CommonModule,
    MainRouterModule
  ],
  providers: [FbpostService],
  declarations: [MainComponent]
})
export class MainModule {
}
