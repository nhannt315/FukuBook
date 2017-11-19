import {AfterContentInit, Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../core/services/post/post.service';
import {Post} from '../../core/models/models.component';
import {NotificationService} from '../../core/services/notification/notification.service';
import {FbpostService} from '../../core/services/fbpost/fbpost.service';
import {Observable} from 'rxjs/Rx';
import {ActivatedRoute} from '@angular/router';

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
              private route: ActivatedRoute) {
    window.onscroll = () => {
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
      console.log('response', response);
      this.postList.push(...response);
      this.fbPostService.addPost(response, () => {
        this.isDataLoaded = true;
        this.isLoading = false;
        this.fbPostService.relayout();
      });
    }, error => this.notifyService.printErrorMessage(error));
  }

  ngOnDestroy(): void {
    this.mySubscribe.unsubscribe();
  }

}
