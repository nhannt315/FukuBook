import {AfterViewChecked, AfterViewInit, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {

  ngAfterViewChecked(): void {

  }

  ngAfterViewInit(): void {

  }

  constructor(private elementRef: ElementRef) {
  }
}
