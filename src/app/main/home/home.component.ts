import {AfterContentInit, Component, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PostService} from '../../core/services/post/post.service';
import {Post} from '../../core/models/models.component';
import {NotificationService} from '../../core/services/notification/notification.service';
import {FB_CONFIG} from '../../core/common/fb.config';
import {FbpostService} from '../../core/services/fbpost/fbpost.service';
import {Observable} from 'rxjs/Rx';
import {ModalDirective} from 'ngx-bootstrap';

declare let FB: any;
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {


  pageIndex = 1;
  public postList: Post[] = [];
  public isDataLoaded = false;
  public isLoading = true;
  private isEndPage = false;
  private mySubscribe;

  constructor(public postService: PostService,
              private notifyService: NotificationService,
              private fbPostService: FbpostService,
              private ngZone: NgZone) {
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
    this.initFacebook();
    this.loadPost();
    this.fbPostService.setRootContainer('#post-container-main', '#post-container-temp');
    this.mySubscribe = Observable.interval(500).subscribe(x => {
      this.fbPostService.layoutIfNeeded();
    });
  }

  initFacebook() {
    FB.init({
      appId: FB_CONFIG.app_id,
      cookie: false,  // enable cookies to allow the server to access
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.5
    });
  }

  private loadPost() {
    this.postService.getAllPost(this.pageIndex).subscribe((response: Post[]) => {
      // this.postList.concat(response);
      if (!response) {
        this.isEndPage = true;
      }
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
