import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../../core/services/category/category.service';
import {Category} from '../../../core/models/models.component';
import {AuthenticationService} from '../../../core/services/authentication/authentication.service';

declare let $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categoryList: Category[];

  constructor(private categoryService: CategoryService, public authService: AuthenticationService) {
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
