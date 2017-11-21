import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../core/services/notification/notification.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  constructor(private notifyService: NotificationService) {
  }

  ngOnInit() {
  }

  addFavorite() {

  }
}
