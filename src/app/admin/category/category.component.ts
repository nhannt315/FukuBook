import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../core/services/category/category.service';
import {NotificationService} from '../../core/services/notification/notification.service';
import {Category} from '../../core/models/models.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryList: Category[];

  constructor(private categoryService: CategoryService, private notifyService: NotificationService) {
  }

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe((response: Category[]) => {
      this.categoryList = response;
    }, error => {

    });
  }
}
