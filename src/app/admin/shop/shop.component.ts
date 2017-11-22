import {Component, OnInit, TemplateRef} from '@angular/core';
import {ShopService} from '../../core/services/shop/shop.service';
import {Category, Shop} from '../../core/models/models.component';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {CategoryService} from '../../core/services/category/category.service';
import {NotificationService} from '../../core/services/notification/notification.service';
import {MessageConstants} from '../../core/common/message.constants';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  mySettings: IMultiSelectSettings = {
    buttonClasses: 'btn btn-outline-primary',
    checkedStyle: 'fontawesome',
    enableSearch: true,
    closeOnSelect: true,
    pullRight: true
  };

  myTextCategory: IMultiSelectTexts = {
    defaultTitle: 'Chọn category'
  };


  modalRef: BsModalRef;
  shopList: Shop[];
  currentEditShop: Shop = new Shop();
  newShopEntity: Shop = new Shop();
  categoryOptions: IMultiSelectOption[] = [];
  categoryList: Category[];

  constructor(private shopService: ShopService, public authService: AuthenticationService,
              private modalService: BsModalService, private categoryService: CategoryService,
              private notifyService: NotificationService) {
  }

  ngOnInit() {
    this.loadShop();
    this.loadCategory();
  }

  loadShop() {
    this.shopService.getAllShop().subscribe((response: Shop[]) => {
      this.shopList = response;
    });
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe((response: Category[]) => {
      this.categoryList = response;
      for (const category of response) {
        this.categoryOptions.push({id: category._id, name: category.alias});
      }

      for (const shop of this.shopList) {
        shop.categoryName = [];
        for (const shopCategory of shop.category) {
          const categoryNameCheck = this.checkCategoryExist(shopCategory);
          if (categoryNameCheck) {
            shop.categoryName.push(categoryNameCheck);
          }
        }
      }
    });
  }

  checkCategoryExist(categoryId): string {
    for (const category of this.categoryList) {
      if (category._id === categoryId) {
        return category.alias;
      }
    }
    return null;
  }


  addNewShop() {
    this.shopService.createNewShop(this.newShopEntity).subscribe(() => {
      this.notifyService.printSuccessMessage(MessageConstants.CREATED_OK_MSG);
      this.modalRef.hide();
      this.loadShop();
    }, error => this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG));
  }

  updateShop() {
    this.shopService.updateShop(this.currentEditShop._id, this.currentEditShop).subscribe(res => {
      this.notifyService.printSuccessMessage(MessageConstants.UPDATED_OK_MSG);
      this.loadShop();
      this.modalRef.hide();
    }, error => {
      this.notifyService.printSuccessMessage(MessageConstants.SYSTEM_ERROR_MSG);
    });
  }

  showDialogConfirmDelete(shop: Shop) {
    this.notifyService.printConfirmationDialog(MessageConstants.CONFIRM_DELETE_MSG, () => {
      this.shopService.deleteShop(shop._id).subscribe(() => {
        this.notifyService.printSuccessMessage(MessageConstants.DELETED_OK_MSG);
        this.loadShop();
      }, error => {
        this.notifyService.printSuccessMessage(MessageConstants.SYSTEM_ERROR_MSG);
      });
    });
  }


  openModal(template: TemplateRef<any>, shop?: Shop) {
    this.modalRef = this.modalService.show(template);
    if (shop) {
      this.currentEditShop = shop;
    }
  }

}
