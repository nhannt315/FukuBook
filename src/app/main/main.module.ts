import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {MainRouterModule} from './main.routes';

@NgModule({
  imports: [
    CommonModule,
    MainRouterModule
  ],
  declarations: [MainComponent]
})
export class MainModule {
}
