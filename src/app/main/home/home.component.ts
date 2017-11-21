import {AfterContentInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {PostService} from '../../core/services/post/post.service';
import {Post} from '../../core/models/models.component';
import {NotificationService} from '../../core/services/notification/notification.service';
import {FbpostService} from '../../core/services/fbpost/fbpost.service';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../core/services/shared/shared.service';

declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {


  pageIndex = 1;
  category = 'all';
  postList: Post[] = [];
  isDataLoaded = false;
  isLoading = true;
  isEndPage = false;
  isFirstTime = true;
  isNotFound = false;
  mySubscribe;

  constructor(public postService: PostService,
              private notifyService: NotificationService,
              private fbPostService: FbpostService,
              private ngZone: NgZone,
              private route: ActivatedRoute,
              private sharedService: SharedService) {
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

  ngAfterContentInit(): void {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['category']) {
        this.category = params['category'];
        console.log('category', this.category);
      }
      this.init();
    });


  }

  init() {
    this.fbPostService.initFacebook();
    this.loadPost();
    this.fbPostService.setRootContainer('#post-container-main', '#post-container-temp');
    this.fbPostService.clearRootContainer();
    this.isDataLoaded = false;
    this.isLoading = true;
    this.isEndPage = false;
    this.isFirstTime = true;
    this.isNotFound = false;
    this.mySubscribe = Observable.interval(500).subscribe(x => {
      this.fbPostService.layoutIfNeeded();
    });
  }


  private loadPost() {
    this.postService.getPostByCategory(this.category, this.pageIndex).subscribe((response: Post[]) => {
      if (!response || response.length === 0) {
        this.isEndPage = true;
        if (this.isFirstTime) {
          this.isNotFound = true;
        }
      }
      this.isFirstTime = false;
      this.postList.push(...response);
      this.fbPostService.addPost(response, () => {
        this.isDataLoaded = true;
        this.isLoading = false;
        this.fbPostService.relayout();
        this.sharedService.changeEmitted$.subscribe(text => {
          if (text === 'LoggedIn') {
            this.fbPostService.updateFavoriteButton();
          } else {
            this.fbPostService.resetFavoriteButton();
          }
        });
      });
    }, error => this.notifyService.printErrorMessage(error));
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
