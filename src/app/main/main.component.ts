import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loadAPI: Promise<any>;

  constructor() {
  }

  ngOnInit() {
    this.loadAPI = new Promise((resolve) => {
      console.log('resolving promise...');
      this.loadScript();
    });
  }
  public loadScript() {
    console.log('preparing to load...')
    const node = document.createElement('script');
    node.src = '/assets/js/homepage.js';
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }



}
