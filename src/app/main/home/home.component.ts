import {
  AfterContentInit, ChangeDetectorRef, Component, ComponentFactoryResolver, NgZone, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PostService} from '../../core/services/post/post.service';
import {Post} from '../../core/models/models.component';
import {NotificationService} from '../../core/services/notification/notification.service';
import {FB_CONFIG} from '../../core/common/fb.config';
import {FbpostService} from '../../core/services/fbpost/fbpost.service';

declare let FB: any;
declare let $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {


  pageIndex = 1;

  public postList: Post[];
  public post: Post;
  public isDataLoaded = false;
  public isDataDownloaded = false;
  iframeWidth = $(window).width() < 768 ? $(window).width() : 360;

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
    setInterval(this.layoutIfNeeded, 200);
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

  layoutIfNeeded() {
    let needUpdate = false;
    this.fbPostService.getRootContainer().find('.grid-item').each((index, item) => {
      if ($(item).height() !== $(item).attr('data-height')) {
        needUpdate = true;
      }
    });
    if (needUpdate) {
      this.fbPostService.relayout();
    }
  }

  getAllPost() {
    this.postService.getAllPost(this.pageIndex).subscribe((response: Post[]) => {
      this.postList = response;
      this.post = this.postList[0];
      this.isDataDownloaded = true;
      this.loadFbPost();
    });
  }

  onScroll(event: any) {
  }

}
