import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../core/services/authentication/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loadAPI: Promise<any>;

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
    });
  }

  public loadScript() {
    this.addScript('/assets/js/homepage.js');
  }

  addScript(path: string) {
    const node = document.createElement('script');
    node.src = path;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}
