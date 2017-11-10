import {AfterViewChecked, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  ngAfterViewChecked(): void {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '/assets/js/homepage.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  constructor(private elementRef: ElementRef) {
  }
}
