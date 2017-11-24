webpackJsonp(["favorite.module"],{

/***/ "../../../../../src/app/main/favorite/favorite.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main/favorite/favorite.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"text-align: center\">\n  <h2>Bài viết yêu thích</h2>\n</div>\n<div style=\"width: 100%\">\n  <div id=\"post-container-main\" class=\"grid\" [hidden]=\"!isDataLoaded\">\n\n  </div>\n</div>\n<div *ngIf=\"isNotFound && authService.isLoggedIn()\" class=\"alert\" style=\"text-align: center\">\n  <h2>Không có bài post nào cả</h2>\n</div>\n<div *ngIf=\"!authService.isLoggedIn()\" class=\"alert\" style=\"text-align: center\">\n  <h2>Bạn cần phải đăng nhập trước</h2>\n</div>\n<div id=\"post-container-temp\" hidden>\n\n</div>\n<div *ngIf=\"isLoading && authService.isLoggedIn()\" class=\"sk-folding-cube loading\">\n  <div class=\"sk-cube1 sk-cube\"></div>\n  <div class=\"sk-cube2 sk-cube\"></div>\n  <div class=\"sk-cube4 sk-cube\"></div>\n  <div class=\"sk-cube3 sk-cube\"></div>\n</div>\n<a href=\"javascript:\" id=\"return-to-top\" (click)=\"scrollToTop()\"><i class=\"fa fa-chevron-up\"></i></a>\n\n"

/***/ }),

/***/ "../../../../../src/app/main/favorite/favorite.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoriteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_services_post_post_service__ = __webpack_require__("../../../../../src/app/core/services/post/post.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_services_notification_notification_service__ = __webpack_require__("../../../../../src/app/core/services/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_services_fbpost_fbpost_service__ = __webpack_require__("../../../../../src/app/core/services/fbpost/fbpost.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_services_shared_shared_service__ = __webpack_require__("../../../../../src/app/core/services/shared/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__ = __webpack_require__("../../../../../src/app/core/common/message.constants.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_services_authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/services/authentication/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FavoriteComponent = (function () {
    function FavoriteComponent(postService, notifyService, fbPostService, ngZone, route, sharedService, authService) {
        var _this = this;
        this.postService = postService;
        this.notifyService = notifyService;
        this.fbPostService = fbPostService;
        this.ngZone = ngZone;
        this.route = route;
        this.sharedService = sharedService;
        this.authService = authService;
        this.pageIndex = 1;
        this.category = 'all';
        this.postList = [];
        this.isDataLoaded = false;
        this.isLoading = true;
        this.isEndPage = false;
        this.isFirstTime = true;
        this.isNotFound = false;
        window.onscroll = function () {
            if ($(window).scrollTop() >= 100) {
                $('#return-to-top').fadeIn(200); // Fade in the arrow
            }
            else {
                $('#return-to-top').fadeOut(200); // Else fade out the arrow
            }
            if ($(window).height() * 33 / 2 + $(window).scrollTop() > $(document).height() - 100) {
                ngZone.run(function () {
                    if (!_this.isEndPage && !_this.isLoading) {
                        _this.pageIndex++;
                        _this.isLoading = true;
                        _this.loadPost();
                    }
                });
            }
        };
    }
    FavoriteComponent.prototype.ngAfterContentInit = function () {
    };
    FavoriteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params['category']) {
                _this.category = params['category'];
            }
            _this.init();
        });
    };
    FavoriteComponent.prototype.init = function () {
        var _this = this;
        this.fbPostService.initFacebook();
        this.loadPost();
        this.fbPostService.setRootContainer('#post-container-main', '#post-container-temp');
        this.fbPostService.clearRootContainer();
        this.isDataLoaded = false;
        this.isLoading = true;
        this.isEndPage = false;
        this.isFirstTime = true;
        this.isNotFound = false;
        this.mySubscribe = __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].interval(500).subscribe(function (x) {
            _this.fbPostService.layoutIfNeeded();
        });
        this.sharedService.changeEmitted$.subscribe(function (text) {
            _this.pageIndex = 1;
            _this.postList = [];
            if (text === 'LoggedIn') {
                _this.fbPostService.clearRootContainer();
                _this.isLoading = true;
                _this.loadPost();
            }
            else {
                _this.fbPostService.resetFavoriteButton();
                _this.fbPostService.clearRootContainer();
            }
        });
    };
    FavoriteComponent.prototype.loadPost = function () {
        var _this = this;
        if (!this.authService.isLoggedIn()) {
            this.isLoading = false;
            return;
        }
        this.postService.getUserFavoritePosts(this.pageIndex).subscribe(function (response) {
            if (!response || response.length === 0) {
                _this.isEndPage = true;
                if (_this.isFirstTime) {
                    _this.isNotFound = true;
                }
                _this.isLoading = false;
            }
            _this.isFirstTime = false;
            (_a = _this.postList).push.apply(_a, response);
            _this.fbPostService.addPost(response, function () {
                _this.isDataLoaded = true;
                _this.isLoading = false;
            });
            var _a;
        }, function (error) {
            _this.notifyService.printErrorMessage(__WEBPACK_IMPORTED_MODULE_7__core_common_message_constants__["a" /* MessageConstants */].SYSTEM_ERROR_MSG);
            _this.isLoading = false;
            _this.notifyService.handleError(error);
        });
    };
    FavoriteComponent.prototype.scrollToTop = function () {
        $('body,html').animate({
            scrollTop: 0 // Scroll to top of body
        }, 500);
    };
    FavoriteComponent.prototype.ngOnDestroy = function () {
        // this.mySubscribe.unsubscribe();
    };
    return FavoriteComponent;
}());
FavoriteComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-favorite',
        template: __webpack_require__("../../../../../src/app/main/favorite/favorite.component.html"),
        styles: [__webpack_require__("../../../../../src/app/main/favorite/favorite.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__core_services_post_post_service__["a" /* PostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__core_services_post_post_service__["a" /* PostService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__core_services_notification_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__core_services_notification_notification_service__["a" /* NotificationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__core_services_fbpost_fbpost_service__["a" /* FbpostService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__core_services_fbpost_fbpost_service__["a" /* FbpostService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* ActivatedRoute */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__core_services_shared_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_services_shared_shared_service__["a" /* SharedService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_8__core_services_authentication_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__core_services_authentication_authentication_service__["a" /* AuthenticationService */]) === "function" && _g || Object])
], FavoriteComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=favorite.component.js.map

/***/ }),

/***/ "../../../../../src/app/main/favorite/favorite.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FavoriteModule", function() { return FavoriteModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__favorite_component__ = __webpack_require__("../../../../../src/app/main/favorite/favorite.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__core_services_notification_notification_service__ = __webpack_require__("../../../../../src/app/core/services/notification/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_services_post_post_service__ = __webpack_require__("../../../../../src/app/core/services/post/post.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_services_authentication_authentication_service__ = __webpack_require__("../../../../../src/app/core/services/authentication/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__favorite_component__["a" /* FavoriteComponent */] }
];
var FavoriteModule = (function () {
    function FavoriteModule() {
    }
    return FavoriteModule;
}());
FavoriteModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild(routes)
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__core_services_authentication_authentication_service__["a" /* AuthenticationService */], __WEBPACK_IMPORTED_MODULE_5__core_services_post_post_service__["a" /* PostService */], __WEBPACK_IMPORTED_MODULE_4__core_services_notification_notification_service__["a" /* NotificationService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__favorite_component__["a" /* FavoriteComponent */]]
    })
], FavoriteModule);

//# sourceMappingURL=favorite.module.js.map

/***/ })

});
//# sourceMappingURL=favorite.module.chunk.js.map