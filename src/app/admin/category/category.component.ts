import {Component, OnInit, TemplateRef} from '@angular/core';
import {CategoryService} from '../../core/services/category/category.service';
import {NotificationService} from '../../core/services/notification/notification.service';
import {Category} from '../../core/models/models.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {UtilityService} from '../../core/services/utility/utility.service';
import {MessageConstants} from '../../core/common/message.constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  modalRef: BsModalRef;

  categoryList: Category[];
  newCategoryEntity: Category = new Category();
  currentEditCategory: Category;
  currentEditKeywords: any[] = [];
  newKeyWords: any[];

  constructor(private categoryService: CategoryService, private notifyService: NotificationService,
              private modalService: BsModalService, private utilService: UtilityService) {
  }

  ngOnInit() {
    this.loadCategory();
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe((response: Category[]) => {
      this.categoryList = response;
    }, error => {
      this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.notifyService.handleError(error);
    });
  }

  openModal(template: TemplateRef<any>, category?: Category) {
    this.modalRef = this.modalService.show(template);
    this.newKeyWords = [];
    if (category) {
      this.currentEditCategory = JSON.parse(JSON.stringify(category));
      this.currentEditKeywords = [];
      for (const key of this.currentEditCategory.keywords) {
        this.currentEditKeywords.push({display: key, value: key});
      }
    }
  }

  addNewCategory() {
    this.newCategoryEntity.keywords = [];
    for (const key of this.newKeyWords) {
      this.newCategoryEntity.keywords.push(key.display);
    }
    this.categoryService.addNewCategory(this.newCategoryEntity).subscribe(() => {
      this.notifyService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      this.modalRef.hide();
      this.loadCategory();
    }, error => {
      this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.notifyService.handleError(error);
    });
  }

  updateCategory() {
    this.currentEditCategory.keywords = [];
    for (const key of this.currentEditKeywords) {
      this.currentEditCategory.keywords.push(key.display);
    }
    this.categoryService.updateCategory(this.currentEditCategory).subscribe(() => {
      this.notifyService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
      this.modalRef.hide();
      this.loadCategory();
    }, error => {
      this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.notifyService.handleError(error);
    });
  }

  deleteCategory(categoryId: string) {
    this.notifyService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        this.notifyService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadCategory();
      }, error => {
        this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
        this.notifyService.handleError(error);
      })
    });
  }


  onInputAliasChange() {
    this.newCategoryEntity.name = this.utilService.slugtify(this.newCategoryEntity.alias);
    if (this.currentEditCategory) {
      this.currentEditCategory.name = this.utilService.slugtify(this.currentEditCategory.alias);
    }
  }


}
