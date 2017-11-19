import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Category, Post, Shop} from '../../core/models/models.component';
import {ShopService} from '../../core/services/shop/shop.service';
import {CategoryService} from '../../core/services/category/category.service';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {ApiUrlConstants} from '../../core/common/api.url.constants';
import {FbpostService} from '../../core/services/fbpost/fbpost.service';
import {Observable} from 'rxjs/Rx';
import {PostService} from '../../core/services/post/post.service';

declare const $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  shopList: Shop[];

  categoryList: Category[];
  mySettings: IMultiSelectSettings = {
    selectionLimit: 1,
    buttonClasses: 'btn btn-outline-primary',
    checkedStyle: 'fontawesome',
    autoUnselect: true,
    enableSearch: true,
    closeOnSelect: true,
    pullRight: true
  };
  myTextShop: IMultiSelectTexts = {
    defaultTitle: 'Chọn shop',
  };

  myTextCategory: IMultiSelectTexts = {
    defaultTitle: 'Chọn category'
  };

  pageIndex = 1;
  pageSize = 12;
  private isEndPage = false;
  public isLoading = false;
  private mySubscribe;
  isFirstTime = true;
  isNotFound = false;
  isDataLoaded = false;
  postList: Post[] = [];

  shopSelectOption: IMultiSelectOption[];
  categorySelectOption: IMultiSelectOption[];
  selectedShop: String;
  selectedCategory: String;
  keyword: String = '';


  constructor(private shopService: ShopService, private categoryService: CategoryService, private ngZone: NgZone,
              private fbPostService: FbpostService, private postService: PostService) {
    window.onscroll = () => {
      if ($(window).scrollTop() >= 100) { // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200); // Fade in the arrow
      } else {
        $('#return-to-top').fadeOut(200); // Else fade out the arrow
      }
      if ($(window).height() * 3 / 2 + $(window).scrollTop() > $(document).height() - 100) {
        ngZone.run(() => {
          if (!this.isEndPage && !this.isLoading) {
            this.pageIndex++;
            this.isLoading = true;
            this.loadPost();
          }
        });
      }
    };
  }

  ngOnInit() {
    this.loadShop();
    this.loadCategory();
    this.fbPostService.initFacebook();
    this.fbPostService.setRootContainer('#post-container-main', '#post-container-temp');
    this.mySubscribe = Observable.interval(500).subscribe(x => {
      this.fbPostService.layoutIfNeeded();
    });
  }

  loadPost() {
    this.postService.searchPost(this.keyword, this.selectedShop, this.selectedCategory, this.pageIndex, this.pageSize)
      .subscribe((response: Post[]) => {
        if (!response || response.length === 0) {
          this.isEndPage = true;
        }
        if (this.isFirstTime && response.length === 0) {
          this.isNotFound = true;
        }
        this.isFirstTime = false;

        this.postList.push(...response);
        this.fbPostService.addPost(response, () => {
          this.isDataLoaded = true;
          this.isLoading = false;
          this.fbPostService.relayout();
        });
      }, error2 => alert('Error'));
  }

  loadShop() {
    this.shopService.getAllShop().subscribe((response: Shop[]) => {
      this.shopList = response;
      this.shopSelectOption = [];
      for (const shop of this.shopList) {
        this.shopSelectOption.push({id: shop.permalink_url, name: shop.name});
      }
    });
  }

  loadCategory() {
    this.categoryService.getAllCategory().subscribe((response: Category[]) => {
      this.categoryList = response;
      this.categorySelectOption = [];
      for (const category of this.categoryList) {
        this.categorySelectOption.push({id: category.name, name: category.alias});
      }
    });
  }

  search() {
    this.fbPostService.clearRootContainer();
    this.isNotFound = false;
    this.postList = [];
    this.isFirstTime = true;
    this.pageIndex = 1;
    this.isDataLoaded = false;
    this.isLoading = true;
    this.loadPost();
    console.log(ApiUrlConstants.SEARCH_POST(this.keyword, this.selectedShop, this.selectedCategory, this.pageIndex, this.pageSize))
  }

  scrollToTop() {
    $('body,html').animate({
      scrollTop: 0 // Scroll to top of body
    }, 500);
  }

  ngOnDestroy(): void {
    this.mySubscribe.unsubscribe();
  }

}
