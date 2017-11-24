webpackJsonp(["search.module"],{

/***/ "../../../../../src/app/main/search/search.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-block {\n  display: block;\n  width: 100%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"addFavUrl\" style=\"display: block;\">\n  <form (ngSubmit)=\"search()\" class=\"\" action=\"\" method=\"post\" style=\"display: inline-block\">\n    <div class=\"form-group\">\n      <input type=\"text\" [(ngModel)]=\"keyword\" name=\"url\" id=\"favUrl\" placeholder=\"Nhập từ khóa tìm kiếm\"\n             class=\"form-control favUrl url\">\n    </div>\n  </form>\n  <ss-multiselect-dropdown *ngIf=\"categorySelectOption\" [settings]=\"mySettings\" [options]=\"categorySelectOption\"\n                           [(ngModel)]=\"selectedCategory\" [texts]=\"myTextCategory\">\n\n  </ss-multiselect-dropdown>\n  <ss-multiselect-dropdown *ngIf=\"shopSelectOption\" [settings]=\"mySettings\" [options]=\"shopSelectOption\"\n                           [(ngModel)]=\"selectedShop\" [texts]=\"myTextShop\">\n\n  </ss-multiselect-dropdown>\n  <button class=\"btn btn-default\" type=\"\" style=\"width: 250px;height: 34px;\" (click)=\"search()\">Tìm kiếm</button>\n</div>\n\n<div class=\"panel-fav-urls\" style=\"display: block;\">\n  <div class=\"heading\">\n    Kết quả tìm kiếm\n    <h2 *ngIf=\"isNotFound\">Không có kết quả</h2>\n  </div>\n  <div class=\"showFavUrl\" style=\"width: 100%\">\n    <div id=\"post-container-main\" class=\"grid showFavUrl\" [hidden]=\"!isDataLoaded\">\n\n    </div>\n\n  </div>\n  <div id=\"post-container-temp\" hidden>\n\n  </div>\n  <div *ngIf=\"isLoading\" class=\"sk-folding-cube loading\">\n    <div class=\"sk-cube1 sk-cube\"></div>\n    <div class=\"sk-cube2 sk-cube\"></div>\n    <div class=\"sk-cube4 sk-cube\"></div>\n    <div class=\"sk-cube3 sk-cube\"></div>\n  </div>\n</div>\n<a href=\"javascript:\" id=\"return-to-top\" (click)=\"scrollToTop()\"><i class=\"fa fa-chevron-up\"></i></a>\n"

/***/ }),

/***/ "../../../../../src/app/main/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_shop_shop_service__ = __webpack_require__("../../../../../src/app/core/services/shop/shop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_category_category_service__ = __webpack_require__("../../../../../src/app/core/services/category/category.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_common_api_url_constants__ = __webpack_require__("../../../../../src/app/core/common/api.url.constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_fbpost_fbpost_service__ = __webpack_require__("../../../../../src/app/core/services/fbpost/fbpost.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_services_post_post_service__ = __webpack_require__("../../../../../src/app/core/services/post/post.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SearchComponent = (function () {
    function SearchComponent(shopService, categoryService, ngZone, fbPostService, postService) {
        var _this = this;
        this.shopService = shopService;
        this.categoryService = categoryService;
        this.ngZone = ngZone;
        this.fbPostService = fbPostService;
        this.postService = postService;
        this.mySettings = {
            selectionLimit: 1,
            buttonClasses: 'btn btn-outline-primary',
            checkedStyle: 'fontawesome',
            autoUnselect: true,
            enableSearch: true,
            closeOnSelect: true,
            pullRight: true
        };
        this.myTextShop = {
            defaultTitle: 'Chọn shop',
        };
        this.myTextCategory = {
            defaultTitle: 'Chọn category'
        };
        this.pageIndex = 1;
        this.pageSize = 12;
        this.isEndPage = false;
        this.isLoading = false;
        this.isFirstTime = true;
        this.isNotFound = false;
        this.isDataLoaded = false;
        this.postList = [];
        this.keyword = '';
        window.onscroll = function () {
            if ($(window).scrollTop() >= 100) {
                $('#return-to-top').fadeIn(200); // Fade in the arrow
            }
            else {
                $('#return-to-top').fadeOut(200); // Else fade out the arrow
            }
            if ($(window).height() * 3 / 2 + $(window).scrollTop() > $(document).height() - 100) {
                ngZone.run(function () {
                    if (!_this.isEndPage && !_this.isLoading) {
                        _this.pageIndex++;
                        _this.isLoading = true;
                        if (_this.fbPostService.getItemCount() > 0) {
                            _this.loadPost();
                        }
                    }
                });
            }
        };
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadShop();
        this.loadCategory();
        this.fbPostService.initFacebook();
        this.fbPostService.setRootContainer('#post-container-main', '#post-container-temp');
        this.mySubscribe = __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].interval(500).subscribe(function (x) {
            _this.fbPostService.layoutIfNeeded();
        });
    };
    SearchComponent.prototype.loadPost = function () {
        var _this = this;
        this.postService.searchPost(this.keyword, this.selectedShop, this.selectedCategory, this.pageIndex, this.pageSize)
            .subscribe(function (response) {
            if (!response || response.length === 0) {
                _this.isEndPage = true;
            }
            if (_this.isFirstTime && response.length === 0) {
                _this.isNotFound = true;
            }
            _this.isFirstTime = false;
            (_a = _this.postList).push.apply(_a, response);
            _this.fbPostService.addPost(response, function () {
                _this.isDataLoaded = true;
                _this.isLoading = false;
                _this.fbPostService.relayout();
            });
            var _a;
        }, function (error2) { return alert('Error'); });
    };
    SearchComponent.prototype.loadShop = function () {
        var _this = this;
        this.shopService.getAllShop().subscribe(function (response) {
            _this.shopList = response;
            _this.shopSelectOption = [];
            for (var _i = 0, _a = _this.shopList; _i < _a.length; _i++) {
                var shop = _a[_i];
                _this.shopSelectOption.push({ id: shop.permalink_url, name: shop.name });
            }
        });
    };
    SearchComponent.prototype.loadCategory = function () {
        var _this = this;
        this.categoryService.getAllCategory().subscribe(function (response) {
            _this.categoryList = response;
            _this.categorySelectOption = [];
            for (var _i = 0, _a = _this.categoryList; _i < _a.length; _i++) {
                var category = _a[_i];
                _this.categorySelectOption.push({ id: category.name, name: category.alias });
            }
        });
    };
    SearchComponent.prototype.search = function () {
        this.fbPostService.clearRootContainer();
        this.isNotFound = false;
        this.postList = [];
        this.isFirstTime = true;
        this.pageIndex = 1;
        this.isDataLoaded = false;
        this.isLoading = true;
        this.loadPost();
        console.log(__WEBPACK_IMPORTED_MODULE_3__core_common_api_url_constants__["a" /* ApiUrlConstants */].SEARCH_POST(this.keyword, this.selectedShop, this.selectedCategory, this.pageIndex, this.pageSize));
    };
    SearchComponent.prototype.scrollToTop = function () {
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        this.mySubscribe.unsubscribe();
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search',
        template: __webpack_require__("../../../../../src/app/main/search/search.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main/search/search.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_services_shop_shop_service__["a" /* ShopService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_services_shop_shop_service__["a" /* ShopService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_services_category_category_service__["a" /* CategoryService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_services_category_category_service__["a" /* CategoryService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__core_services_fbpost_fbpost_service__["a" /* FbpostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__core_services_fbpost_fbpost_service__["a" /* FbpostService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_services_post_post_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_services_post_post_service__["a" /* PostService */]) === "function" && _e || Object])
], SearchComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ "../../../../../src/app/main/search/search.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchModule", function() { return SearchModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_component__ = __webpack_require__("../../../../../src/app/main/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_category_category_service__ = __webpack_require__("../../../../../src/app/core/services/category/category.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_services_shop_shop_service__ = __webpack_require__("../../../../../src/app/core/services/shop/shop.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular_2_dropdown_multiselect__ = __webpack_require__("../../../../angular-2-dropdown-multiselect/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_services_post_post_service__ = __webpack_require__("../../../../../src/app/core/services/post/post.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__core_services_fbpost_fbpost_service__ = __webpack_require__("../../../../../src/app/core/services/fbpost/fbpost.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__search_component__["a" /* SearchComponent */] }
];
var SearchModule = (function () {
    function SearchModule() {
    }
    return SearchModule;
}());
SearchModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild(routes),
            __WEBPACK_IMPORTED_MODULE_6_angular_2_dropdown_multiselect__["a" /* MultiselectDropdownModule */],
            __WEBPACK_IMPORTED_MODULE_7__angular_forms__["FormsModule"]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_4__core_services_category_category_service__["a" /* CategoryService */], __WEBPACK_IMPORTED_MODULE_5__core_services_shop_shop_service__["a" /* ShopService */], __WEBPACK_IMPORTED_MODULE_8__core_services_post_post_service__["a" /* PostService */], __WEBPACK_IMPORTED_MODULE_9__core_services_fbpost_fbpost_service__["a" /* FbpostService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__search_component__["a" /* SearchComponent */]]
    })
], SearchModule);

//# sourceMappingURL=search.module.js.map

/***/ })

});
//# sourceMappingURL=search.module.chunk.js.map