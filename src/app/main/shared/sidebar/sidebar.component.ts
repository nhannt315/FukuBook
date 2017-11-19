import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {CategoryService} from '../../../core/services/category/category.service';
import {Category} from '../../../core/models/models.component';

declare let $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categoryList: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe((response: Category[]) => {
      this.categoryList = response;
    });
  }


}
