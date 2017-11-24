import {Component, OnInit} from '@angular/core';
import {SystemConstants} from '../core/common/system.constants';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  appName = SystemConstants.APP_NAME;

  constructor() { }

  ngOnInit() {
  }

}
