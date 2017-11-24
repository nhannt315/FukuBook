import {AfterContentInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../core/services/post/post.service';
import {Post} from '../../core/models/models.component';
import {NotificationService} from '../../core/services/notification/notification.service';
import {FbpostService} from '../../core/services/fbpost/fbpost.service';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../core/services/shared/shared.service';
import {MessageConstants} from '../../core/common/message.constants';
import {AuthenticationService} from '../../core/services/authentication/authentication.service';

declare let $: any;

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, AfterContentInit, OnDestroy {

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
              private sharedService: SharedService,
              private authService: AuthenticationService) {
    window.onscroll = () => {
      if ($(window).scrollTop() >= 100) { // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200); // Fade in the arrow
      } else {
        $('#return-to-top').fadeOut(200); // Else fade out the arrow
      }
      if ($(window).height() * 33 / 2 + $(window).scrollTop() > $(document).height() - 100) {
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
    this.sharedService.changeEmitted$.subscribe(text => {
      this.pageIndex = 1;
      this.postList = [];
      if (text === 'LoggedIn') {
        this.fbPostService.clearRootContainer();
        this.isLoading = true;
        this.loadPost();
      } else {
        this.fbPostService.resetFavoriteButton();
        this.fbPostService.clearRootContainer();
      }
    });
  }


  private loadPost() {
    if (!this.authService.isLoggedIn()) {
      this.isLoading = false;
      return;
    }
    this.postService.getUserFavoritePosts(this.pageIndex).subscribe((response: Post[]) => {
      if (!response || response.length === 0) {
        this.isEndPage = true;
        if (this.isFirstTime) {
          this.isNotFound = true;
        }
        this.isLoading = false;
      }
      this.isFirstTime = false;
      this.postList.push(...response);
      this.fbPostService.addPost(response, () => {
        this.isDataLoaded = true;
        this.isLoading = false;
      });
    }, error => {
      this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
      this.isLoading = false;
      this.notifyService.handleError(error);
    });
  }

  scrollToTop() {
    $('body,html').animate({
      scrollTop: 0 // Scroll to top of body
    }, 500);
  }

  ngOnDestroy(): void {
    // this.mySubscribe.unsubscribe();
  }
}
