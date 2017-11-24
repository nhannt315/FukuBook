webpackJsonp(["notfound.module"],{

/***/ "../../../../../src/app/notfound/notfound.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*--\nAuthor: W3layouts\nAuthor URL: http://w3layouts.com\nLicense: Creative Commons Attribution 3.0 Unported\nLicense URL: http://creativecommons.org/licenses/by/3.0/\n--*/\n/*-- reset --*/\nhtml, body, div, span, applet, object, iframe, h1, h1, h2, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, dl, dt, dd, ol, nav ul, nav li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\n  display: block;\n}\n\nol, ul {\n  list-style: none;\n  margin: 0px;\n  padding: 0px;\n}\n\nblockquote, q {\n  quotes: none;\n}\n\nblockquote:before, blockquote:after, q:before, q:after {\n  content: '';\n  content: none;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\n/*-- start editing from here --*/\na {\n  text-decoration: none;\n}\n\n.txt-rt {\n  text-align: right;\n}\n\n/* text align right */\n.txt-lt {\n  text-align: left;\n}\n\n/* text align left */\n.txt-center {\n  text-align: center;\n}\n\n/* text align center */\n.float-rt {\n  float: right;\n}\n\n/* float right */\n.float-lt {\n  float: left;\n}\n\n/* float left */\n.clear {\n  clear: both;\n}\n\n/* clear float */\n.pos-relative {\n  position: relative;\n}\n\n/* Position Relative */\n.pos-absolute {\n  position: absolute;\n}\n\n/* Position Absolute */\n.vertical-base {\n  vertical-align: baseline;\n}\n\n/* vertical align baseline */\n.vertical-top {\n  vertical-align: top;\n}\n\n/* vertical align top */\nnav.vertical ul li {\n  display: block;\n}\n\n/* vertical menu */\nnav.horizontal ul li {\n  display: inline-block;\n}\n\n/* horizontal menu */\nimg {\n  max-width: 100%;\n}\n\n/*-- end reset --*/\nbody {\n  font-family: 'Open Sans', sans-serif;\n  height: 100%;\n  /*background: url(/assets/img/1.jpg) no-repeat center 0px;*/\n  /*-webkit-background-size: cover;*/\n  /*-moz-background-size: cover;*/\n  /*background-size: cover;*/\n  /*background-attachment: fixed;*/\n}\n.bg {\n  /* The image used */\n  background-image: url(/assets/img/1.jpg);\n\n  /* Full height */\n  height: 100%;\n\n  /* Center and scale the image nicely */\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n\n\n/*-- main --*/\n.agileinfo-row {\n  width: 65%;\n  margin: 0 auto;\n}\n\n/*-- top-nav --*/\n.w3top-nav-right {\n  margin-top: 4em;\n}\n\n.w3top-nav-left h1 {\n  font-size: 3em;\n  font-weight: 100;\n  line-height: .9em;\n}\n\n.w3top-nav-left h1 a {\n  color: #fff;\n}\n\n.w3top-nav-right ul li {\n  display: inline-block;\n  margin: 0 1.2em;\n}\n\n.w3top-nav-right ul li a {\n  color: #fff;\n  font-size: 1em;\n  transition: 0.5s all;\n}\n\n.w3top-nav-right ul li a:hover {\n  color: #fbb034;\n}\n\n/*-- //top-nav --*/\n/*-- //errortext --*/\n.w3layouts-errortext {\n  padding-top: 4em;\n  text-align: center;\n}\n\nh1 {\n  font-size: 1.2em;\n  color: #fff;\n  font-weight: 900;\n  line-height: 1.8em;\n}\n\np.w3lstext {\n  font-size: 0.9em;\n  color: #fff;\n  line-height: 1.8em;\n  font-weight: 400;\n  width: 65%;\n  text-transform: capitalize;\n  margin: 1.5em auto 2.5em;\n}\n\np.w3lstext a {\n  color: #fbb034;\n  padding-right: 10px;\n}\n\np.w3lstext a:hover {\n  color: #ffffff;\n}\n\n.agile-search input[type=\"text\"] {\n  width: 50%;\n  padding: 0.8em 1.5em;\n  font-size: 1em;\n  color: #fff;\n  outline: none;\n  border: 1px solid #fbb034;\n  background: none;\n  border-radius: 50px;\n  -webkit-appearance: none;\n  transition: 0.5s all;\n}\n\n.agile-search input[type=\"submit\"] {\n  outline: none;\n  box-shadow: none;\n  background: #fbb034;\n  border: 1px solid #fbb034;\n  padding: .8em 3em;\n  color: #fff;\n  cursor: pointer;\n  border-radius: 50px;\n  font-size: 1em;\n  margin-left: 0.5em;\n  transition: 0.5s all;\n}\n\n.agile-search input[type=\"submit\"]:hover {\n  color: #fbb034;\n  background: transparent;\n}\n\n::-webkit-input-placeholder {\n  color: #fff !important;\n}\n\n:-moz-placeholder { /* Firefox 18- */\n  color: #fff !important;\n}\n\n::-moz-placeholder { /* Firefox 19+ */\n  color: #fff !important;\n}\n\n:-ms-input-placeholder {\n  color: #fff !important;\n}\n\n/*-- errortext --*/\n/*-- copyright --*/\n.copyright {\n  margin: 3em 0 2em;\n  text-align: center;\n}\n\n.copyright p {\n  font-size: 1em;\n  color: #fff;\n  line-height: 1.8em;\n}\n\n.copyright p a {\n  color: #fff;\n  transition: 0.5s all;\n}\n\n.copyright p a:hover {\n  color: #fbb034;\n}\n\n/*-- //copyright --*/\n/*-- //main --*/\n.w3layouts-errortext h2 {\n  font-size: 14em;\n  letter-spacing: 20px;\n  color: #fff;\n}\n\nspan {\n  color: #fbb034;\n}\n\n/*-- responsive-design --*/\n@media (max-width: 1366px) {\n  p.w3lstext {\n    width: 75%;\n  }\n}\n\n@media (max-width: 1080px) {\n  .agileinfo-row {\n    width: 75%;\n  }\n}\n\n@media (max-width: 991px) {\n  p.w3lstext {\n    width: 85%;\n  }\n}\n\n@media (max-width: 900px) {\n  .agileinfo-row {\n    width: 85%;\n  }\n\n  .w3top-nav {\n    padding-top: 2em;\n  }\n\n  .w3layouts-errortext {\n    padding-top: 5em;\n    text-align: center;\n  }\n\n  .w3top-nav-right ul li {\n    margin: 0 1em;\n  }\n\n  p.w3lstext {\n    width: 95%;\n  }\n}\n\n@media (max-width: 736px) {\n  .w3layouts-errortext {\n    padding-top: 3em;\n  }\n}\n\n@media (max-width: 667px) {\n  .w3top-nav-right ul li {\n    margin: 0 0.5em;\n  }\n\n  h1 {\n    font-size: 1em;\n  }\n\n  p.w3lstext {\n    width: 100%;\n    font-size: 0.85em;\n    line-height: 2em;\n  }\n\n  .copyright {\n    margin: 2em 0 2em;\n  }\n\n  .w3layouts-errortext {\n    padding-top: 2em;\n  }\n}\n\n@media (max-width: 480px) {\n  .w3top-nav-left, .w3top-nav-right {\n    float: none;\n    text-align: center;\n  }\n\n  .w3top-nav-right {\n    margin-top: 1.5em;\n  }\n\n  .w3top-nav-right ul li a {\n    font-size: 0.9em;\n  }\n\n  .w3top-nav-right ul li {\n    margin: 0 1em;\n  }\n\n  .w3layouts-errortext img {\n    width: 52%;\n  }\n\n  h1 {\n    font-size: 0.9em;\n  }\n\n  .agile-search input[type=\"text\"], .agile-search input[type=\"submit\"] {\n    font-size: 0.9em;\n  }\n\n  .copyright p {\n    font-size: 0.9em;\n    padding: 0 1em;\n  }\n\n  .w3layouts-errortext {\n    padding-top: 6em;\n  }\n}\n\n@media (max-width: 414px) {\n  .w3layouts-errortext h2 {\n    font-size: 9em;\n  }\n\n  .w3layouts-errortext {\n    padding-top: 2em;\n  }\n\n  .agile-search input[type=\"text\"] {\n    width: 80%;\n    margin-bottom: 1em;\n  }\n}\n\n@media (max-width: 384px) {\n  .agile-search input[type=\"text\"] {\n    width: 85%;\n  }\n\n  .agile-search input[type=\"submit\"] {\n    margin: 0em 0 0 0;\n    padding: .7em 2em;\n  }\n\n  .w3top-nav {\n    padding-top: 1em;\n  }\n\n  p.w3lstext {\n    font-size: 0.8em;\n  }\n\n  .agileinfo-row {\n    width: 87%;\n  }\n\n  .w3layouts-errortext {\n    padding-top: 1em;\n  }\n\n  .w3layouts-errortext h2 {\n    letter-spacing: 10px;\n  }\n}\n\n@media (max-width: 320px) {\n  .w3top-nav-right ul li a {\n    font-size: 0.85em;\n  }\n\n  .w3top-nav-right ul li {\n    margin: 0 0.6em;\n  }\n\n  h1 {\n    font-size: 0.85em;\n  }\n\n  p.w3lstext {\n    margin: 0.8em auto;\n  }\n\n  .w3layouts-errortext {\n    padding-top: 0em;\n  }\n\n  .w3top-nav-right {\n    margin-top: 1em;\n  }\n\n  .agile-search input[type=\"submit\"] {\n    padding: .6em 2em;\n  }\n\n  .copyright {\n    margin: 1em 0 1em;\n  }\n\n  .copyright p {\n    font-size: 0.8em;\n  }\n\n  .w3layouts-errortext h2 {\n    font-size: 7em;\n  }\n}\n\n/*-- //responsive-design --*/\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/notfound/notfound.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\nAuthor: W3layouts\nAuthor URL: http://w3layouts.com\nLicense: Creative Commons Attribution 3.0 Unported\nLicense URL: http://creativecommons.org/licenses/by/3.0/\n-->\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Elegant Error Page Flat Responsive Widget Template :: w3layouts</title>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"/>\n    <meta name=\"keywords\"\n          content=\"Elegant Error Page template Responsive, Login form web template,Flat Pricing tables,Flat Drop downs  Sign up Web Templates, Flat Web Templates, Login sign up Responsive web template, SmartPhone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyEricsson, Motorola web design\"/>\n    <script type=\"application/x-javascript\"> addEventListener(\"load\", function () {\n      setTimeout(hideURLbar, 0);\n    }, false);\n\n    function hideURLbar() {\n      window.scrollTo(0, 1);\n    } </script>\n    <!-- Custom Theme files -->\n    <link href=\"css/style.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\"/>\n    <!-- //Custom Theme files -->\n    <!-- web font -->\n    <link href='//fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'>\n    <!--web font-->\n    <!-- //web font -->\n  </head>\n  <body class=\"bg\">\n    <!-- main -->\n    <div class=\"agileits-main\">\n      <div class=\"agileinfo-row\">\n\n        <div class=\"w3layouts-errortext\">\n          <h2>4<span>0</span>4</h2>\n\n          <h1>Sorry! The page you were looking for could not be found </h1>\n          <p class=\"w3lstext\">You have been tricked into click on a link that can not be found. Please check the url or\n            go to <a routerLink=\"/main/home/\">main page</a> and see if you can locate what you are looking for </p>\n          <div class=\"agile-search\">\n          </div>\n          <div class=\"w3top-nav-right\">\n            <ul>\n              <li><a routerLink=\"/main/home/\">Home</a></li>\n            </ul>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- //main -->\n    <!-- copyright -->\n    <div class=\"copyright w3-agile\">\n      <p>© 2017 {{appName}}</p>\n    </div>\n    <!-- //copyright -->\n  </body>\n</html>\n"

/***/ }),

/***/ "../../../../../src/app/notfound/notfound.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotfoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_common_system_constants__ = __webpack_require__("../../../../../src/app/core/common/system.constants.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NotfoundComponent = (function () {
    function NotfoundComponent() {
        this.appName = __WEBPACK_IMPORTED_MODULE_1__core_common_system_constants__["a" /* SystemConstants */].APP_NAME;
    }
    NotfoundComponent.prototype.ngOnInit = function () {
    };
    return NotfoundComponent;
}());
NotfoundComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-notfound',
        template: __webpack_require__("../../../../../src/app/notfound/notfound.component.html"),
        styles: [__webpack_require__("../../../../../src/app/notfound/notfound.component.css")]
    }),
    __metadata("design:paramtypes", [])
], NotfoundComponent);

//# sourceMappingURL=notfound.component.js.map

/***/ }),

/***/ "../../../../../src/app/notfound/notfound.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotfoundModule", function() { return NotfoundModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__notfound_component__ = __webpack_require__("../../../../../src/app/notfound/notfound.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__notfound_component__["a" /* NotfoundComponent */] }
];
var NotfoundModule = (function () {
    function NotfoundModule() {
    }
    return NotfoundModule;
}());
NotfoundModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* RouterModule */].forChild(routes)
        ],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__notfound_component__["a" /* NotfoundComponent */]]
    })
], NotfoundModule);

//# sourceMappingURL=notfound.module.js.map

/***/ })

});
//# sourceMappingURL=notfound.module.chunk.js.map