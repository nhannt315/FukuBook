import {AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterViewChecked, OnInit {
  ngOnInit(): void {
    if (location.protocol === 'http:') {
      location.href = location.href.replace(/^http:/, 'https:');
    }
  }

  ngAfterViewChecked(): void {

  }

  ngAfterViewInit(): void {

  }

  constructor(private elementRef: ElementRef) {
  }
}
