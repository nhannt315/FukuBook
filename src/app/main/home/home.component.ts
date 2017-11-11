import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../core/services/post/post.service';
import {Post} from '../../core/models/models.component';
import {NotificationService} from '../../core/services/notification/notification.service';
import {FB_CONFIG} from '../../core/common/fb.config';
import {FbpostService} from '../../core/services/fbpost/fbpost.service';
import {Observable} from 'rxjs/Rx';

declare let FB: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {
  pageIndex = 1;
  public postList: Post[];
  public post: Post;
  public isDataLoaded = false;
  public isDataDownloaded = false;
  private mySubscribe;

  constructor(public postService: PostService,
              private notifyService: NotificationService,
              private fbPostService: FbpostService) {

  }

  ngAfterContentInit(): void {
    window.addEventListener('scroll', this.onScroll, true);
  }

  ngOnInit() {
    this.initFacebook();
    this.getAllPost();
    this.fbPostService.setRootContainer('#post-container');
    this.mySubscribe = Observable.interval(200).subscribe(x => {
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

  loadFbPost() {
    for (const post of this.postList) {
      this.fbPostService.appendPost(post.permalink_url);
    }
    FB.XFBML.parse(this.fbPostService.getRootContainer()[0], () => {
      this.isDataLoaded = true;
      this.fbPostService.relayout();
      this.notifyService.printSuccessMessage('Dataloaded');
    });
  }


  getAllPost() {
    this.postService.getAllPost(this.pageIndex).subscribe((response: Post[]) => {
      this.postList = response;
      this.post = this.postList[0];
      this.isDataDownloaded = true;
      this.loadFbPost();
    }, error => this.notifyService.printErrorMessage(error));
  }

  ngOnDestroy(): void {
    this.mySubscribe.unsubscribe();
  }

  onScroll(event: any) {
  }

}
