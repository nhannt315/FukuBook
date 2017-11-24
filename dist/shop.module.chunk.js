webpackJsonp(["shop.module"],{

/***/ "../../../../../src/app/admin/shop/shop.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.text-black {\n  color: black;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/admin/shop/shop.component.html":
/***/ (function(module, exports) {

module.exports = "<ul class=\"nav\" style=\"margin: 10px\">\n  <li>\n    <button class=\"btn btn-success\" (click)=\"openModal(newShop)\">Thêm mới\n    </button>\n  </li>\n</ul>\n<table class=\"table table-responsive table-hover table-bordered\" style=\"margin-left: 10px; background-color: white\">\n  <thead>\n    <tr>\n      <th>Tên shop</th>\n      <th>Facebook</th>\n      <th>Category</th>\n      <th>Action</th>\n    </tr>\n  </thead>\n  <tbody *ngIf=\"shopList\">\n    <tr *ngFor=\"let shop of shopList\">\n      <td>{{shop.name}}</td>\n      <td><a href=\"https://facebook.com/{{shop.permalink_url}}\">https://facebook.com/{{shop.permalink_url}}</a></td>\n      <td><span *ngFor=\"let cateName of shop.categoryName\">{{cateName}},</span></td>\n      <td>\n        <button class=\"btn btn-primary\" (click)=\"openModal(editShop, shop)\">\n          <i class=\"fa fa-pencil-square-o\"></i>\n        </button>\n        <button class=\"btn btn-danger\" (click)=\"showDialogConfirmDelete(shop)\">\n          <i class=\"fa fa-trash\"></i>\n        </button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n<div *ngIf=\"!shopList\" class=\"sk-folding-cube loading\">\n  <div class=\"sk-cube1 sk-cube\"></div>\n  <div class=\"sk-cube2 sk-cube\"></div>\n  <div class=\"sk-cube4 sk-cube\"></div>\n  <div class=\"sk-cube3 sk-cube\"></div>\n</div>\n\n<ng-template #editShop>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left\">Chỉnh sửa thông tin shop</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div *ngIf=\"currentEditShop\" class=\"modal-body\">\n    <form class=\"form-horizontal form-label-left\" #editForm=\"ngForm\" novalidate (ngSubmit)=\"updateShop()\">\n      <div class=\"form-group\">\n        <label class=\"control-label col-md-3 col-sm-3 col-xs-12 text-black\">Tên shop</label>\n        <div class=\"col-md-9 col-sm-9 col-xs-12\">\n          <input type=\"text\" #name=\"ngModel\" [(ngModel)]=\"currentEditShop.name\" required\n                 name=\"name\" class=\"form-control text-black\">\n          <small [hidden]=\"name.valid || (name.pristine && !editForm.submitted)\"\n                 class=\"text-danger\">\n            Bạn phải nhập tên shop\n          </small>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label col-md-3 col-sm-3 col-xs-12 text-black\">Facebook link</label>\n        <div class=\"col-md-9 col-sm-9 col-xs-12\">\n          <input type=\"text\" #link=\"ngModel\" [(ngModel)]=\"currentEditShop.permalink_url\" required\n                 name=\"link\" class=\"form-control text-black\">\n          <small [hidden]=\"link.valid || (link.pristine && !editForm.submitted)\"\n                 class=\"text-danger\">\n            Bạn phải nhập link shop\n          </small>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label col-md-3 col-sm-3 col-xs-12 text-black\">Category</label>\n        <div class=\"col-md-9 col-sm-9 col-xs-12 text-black\">\n          <ss-multiselect-dropdown [settings]=\"mySettings\" [texts]=\"myTextCategory\"\n                                   [options]=\"categoryOptions\"\n                                   [(ngModel)]=\"currentEditShop.category\"\n                                   [ngModelOptions]=\"{standalone: true}\">\n\n          </ss-multiselect-dropdown>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"col-md-9 col-sm-9 col-xs-12 col-md-offset-3\">\n          <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!editForm.form.valid\">Cập nhật</button>\n          <button type=\"button\" (click)=\"modalRef.hide()\" class=\"btn btn-primary\">Hủy bỏ</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</ng-template>\n\n<ng-template #newShop>\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title pull-left text-black\">Thêm mới shop</h4>\n    <button type=\"button\" class=\"close pull-right\" aria-label=\"Close\" (click)=\"modalRef.hide()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"modal-body\">\n    <form class=\"form-horizontal form-label-left\" #addForm=\"ngForm\" novalidate (ngSubmit)=\"addNewShop()\">\n      <div class=\"form-group\">\n        <label class=\"control-label col-md-3 col-sm-3 col-xs-12 text-black\">Tên shop</label>\n        <div class=\"col-md-9 col-sm-9 col-xs-12\">\n          <input type=\"text\" #name=\"ngModel\" [(ngModel)]=\"newShopEntity.name\" required\n                 name=\"name\" class=\"form-control text-black\">\n          <small [hidden]=\"name.valid || (name.pristine && !addForm.submitted)\"\n                 class=\"text-danger\">\n            Bạn phải nhập tên shop\n          </small>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label col-md-3 col-sm-3 col-xs-12 text-black\">Facebook link</label>\n        <div class=\"col-md-9 col-sm-9 col-xs-12\">\n          <input type=\"text\" #link=\"ngModel\" [(ngModel)]=\"newShopEntity.permalink_url\" required\n                 name=\"link\" class=\"form-control text-black\">\n          <small [hidden]=\"link.valid || (link.pristine && !addForm.submitted)\"\n                 class=\"text-danger\">\n            Bạn phải nhập link shop\n          </small>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <label class=\"control-label col-md-3 col-sm-3 col-xs-12 text-black\">Category</label>\n        <div class=\"col-md-9 col-sm-9 col-xs-12 text-black\">\n          <ss-multiselect-dropdown [settings]=\"mySettings\" [texts]=\"myTextCategory\"\n                                   [options]=\"categoryOptions\"\n                                   [(ngModel)]=\"newShopEntity.category\"\n                                   [ngModelOptions]=\"{standalone: true}\">\n\n          </ss-multiselect-dropdown>\n        </div>\n      </div>\n      <div class=\"form-group\">\n        <div class=\"col-md-9 col-sm-9 col-xs-12 col-md-offset-3\">\n          <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"!addForm.form.valid\">Thêm mới</button>\n          <button type=\"button\" (click)=\"modalRef.hide()\" class=\"btn btn-primary\">Hủy bỏ</button>\n        </div>\n      </div>\n    </form>\n  </div>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/admin/shop/shop.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShopComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_shop_shop_service__ = __webpack_require__("../../../../../src/app/core/services/shop/shop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_models_models_component__ = __webpack_require__("../../../../../src/app/core/models/models.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/services/authentication/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_services_category_category_service__ = __webpack_require__("../../../../../src/app/core/services/category/category.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_services_notification_notification_service__ = __webpack_require__("../../../../../src/app/core/services/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__ = __webpack_require__("../../../../../src/app/core/common/message.constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ShopComponent = (function () {
    function ShopComponent(shopService, authService, modalService, categoryService, notifyService) {
        this.shopService = shopService;
        this.authService = authService;
        this.modalService = modalService;
        this.categoryService = categoryService;
        this.notifyService = notifyService;
        this.mySettings = {
            buttonClasses: 'btn btn-outline-primary',
            checkedStyle: 'fontawesome',
            enableSearch: true,
            closeOnSelect: true,
            pullRight: true
        };
        this.myTextCategory = {
            defaultTitle: 'Chọn category'
        };
        this.currentEditShop = new __WEBPACK_IMPORTED_MODULE_2__core_models_models_component__["b" /* Shop */]();
        this.newShopEntity = new __WEBPACK_IMPORTED_MODULE_2__core_models_models_component__["b" /* Shop */]();
        this.categoryOptions = [];
    }
    ShopComponent.prototype.ngOnInit = function () {
        this.loadShop();
    };
    ShopComponent.prototype.loadShop = function () {
        var _this = this;
        this.shopService.getAllShop().subscribe(function (response) {
            _this.shopList = response;
            _this.loadCategory();
        });
    };
    ShopComponent.prototype.loadCategory = function () {
        var _this = this;
        this.categoryService.getAllCategory().subscribe(function (response) {
            _this.categoryList = response;
            for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                var category = response_1[_i];
                _this.categoryOptions.push({ id: category._id, name: category.alias });
            }
            for (var _a = 0, _b = _this.shopList; _a < _b.length; _a++) {
                var shop = _b[_a];
                shop.categoryName = [];
                for (var _c = 0, _d = shop.category; _c < _d.length; _c++) {
                    var shopCategory = _d[_c];
                    var categoryNameCheck = _this.checkCategoryExist(shopCategory);
                    if (categoryNameCheck) {
                        shop.categoryName.push(categoryNameCheck);
                    }
                }
            }
        }, function (error2) {
            _this.notifyService.printErrorMessage(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].SYSTEM_ERROR_MSG);
            _this.notifyService.handleError(error2);
        });
    };
    ShopComponent.prototype.checkCategoryExist = function (categoryId) {
        for (var _i = 0, _a = this.categoryList; _i < _a.length; _i++) {
            var category = _a[_i];
            if (category._id === categoryId) {
                return category.alias;
            }
        }
        return null;
    };
    ShopComponent.prototype.addNewShop = function () {
        var _this = this;
        this.shopService.createNewShop(this.newShopEntity).subscribe(function () {
            _this.notifyService.printSuccessMessage(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].CREATED_OK_MSG);
            _this.modalRef.hide();
            _this.loadShop();
        }, function (error) {
            _this.notifyService.printErrorMessage(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].SYSTEM_ERROR_MSG);
            _this.notifyService.handleError(error);
        });
    };
    ShopComponent.prototype.updateShop = function () {
        var _this = this;
        this.shopService.updateShop(this.currentEditShop._id, this.currentEditShop).subscribe(function (res) {
            _this.notifyService.printSuccessMessage(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].UPDATED_OK_MSG);
            _this.loadShop();
            _this.modalRef.hide();
        }, function (error) {
            _this.notifyService.printErrorMessage(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].SYSTEM_ERROR_MSG);
            _this.notifyService.handleError(error);
        });
    };
    ShopComponent.prototype.showDialogConfirmDelete = function (shop) {
        var _this = this;
        this.notifyService.printConfirmationDialog(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].CONFIRM_DELETE_MSG, function () {
            _this.shopService.deleteShop(shop._id).subscribe(function () {
                _this.notifyService.printSuccessMessage(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].DELETED_OK_MSG);
                _this.loadShop();
            }, function (error) {
                _this.notifyService.printErrorMessage(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].SYSTEM_ERROR_MSG);
                _this.notifyService.handleError(error);
            });
        });
    };
    ShopComponent.prototype.openModal = function (template, shop) {
        this.modalRef = this.modalService.show(template);
        if (shop) {
            this.currentEditShop = JSON.parse(JSON.stringify(shop));
        }
    };
    return ShopComponent;
}());
ShopComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-shop',
        template: __webpack_require__("../../../../../src/app/admin/shop/shop.component.html"),
        styles: [__webpack_require__("../../../../../src/app/admin/shop/shop.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_services_shop_shop_service__["a" /* ShopService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_services_shop_shop_service__["a" /* ShopService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__core_services_authentication_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_services_authentication_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__["a" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap__["a" /* BsModalService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_services_category_category_service__["a" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_services_category_category_service__["a" /* CategoryService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_services_notification_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_services_notification_notification_service__["a" /* NotificationService */]) === "function" && _e || Object])
], ShopComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=shop.component.js.map

/***/ }),

/***/ "../../../../../src/app/admin/shop/shop.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopModule", function() { return ShopModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shop_component__ = __webpack_require__("../../../../../src/app/admin/shop/shop.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular_2_dropdown_multiselect__ = __webpack_require__("../../../../angular-2-dropdown-multiselect/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__shop_component__["a" /* ShopComponent */] }
];
var ShopModule = (function () {
    function ShopModule() {
    }
    return ShopModule;
}());
ShopModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_5_angular_2_dropdown_multiselect__["a" /* MultiselectDropdownModule */]
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__shop_component__["a" /* ShopComponent */]]
    })
], ShopModule);

//# sourceMappingURL=shop.module.js.map

/***/ })

});
//# sourceMappingURL=shop.module.chunk.js.map