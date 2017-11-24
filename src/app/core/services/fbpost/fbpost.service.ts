import {Injectable} from '@angular/core';
import {Post} from '../../models/models.component';
import {FB_CONFIG} from '../../common/fb.config';
import {AuthenticationService} from '../authentication/authentication.service';
import {PostService} from '../post/post.service';
import {NotificationService} from '../notification/notification.service';
import {MessageConstants} from '../../common/message.constants';

declare let $: any;
declare let FB: any;
declare let Isotope: any;

@Injectable()
export class FbpostService {

  private postContainer;
  private tempPostContainer;
  iframeWidth = $(window).width() < 768 ? $(window).width() : 360;

  constructor(private authService: AuthenticationService, private postService: PostService, private notifyService: NotificationService) {
  }

  initFacebook() {
    FB.init({
      appId: FB_CONFIG.app_id,
      cookie: false,  // enable cookies to allow the server to access
      xfbml: true,  // parse social plugins on this page
      version: 'v2.8' // use graph api version 2.5
    });
  }

  clearRootContainer() {
    this.postContainer.empty();
  }

  getItemCount() {
    return $('.grid-item').length;
  }

  setRootContainer(containerId: String, tempContainerID: String) {
    this.postContainer = $(containerId).isotope({
      masonry: {
        columnWidth: this.iframeWidth,
        gutter: 10,
        fitWidth: true
      },
      itemSelector: '.grid-item',
      isAnimated: true,
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
    this.postContainer.resize(() => {

    });
    this.tempPostContainer = $(tempContainerID);
  }

  getRootContainer(): any {
    return this.postContainer;
  }

  addPost(postList: Post[], callback) {
    for (const post of postList) {
      const postContent = `<div class='fb-post grid-item' data-href='${post.permalink_url}' data-width='${this.iframeWidth}'
                              data-show-text='true' data-id='${post.permalink_url}'></div>`;
      const $postContent = $(postContent);
      this.tempPostContainer.append($postContent);
      this.relayout();
    }
    FB.XFBML.parse(this.tempPostContainer[0], () => {
      this.tempPostContainer.children().each((index, obj) => {
        this.postContainer.append($(obj)).isotope('appended', $(obj));
        this.relayout();
      });
      this.addFavoriteBtn();
      this.tempPostContainer.empty();
      this.relayout();
      callback();
    });
  }

  addFavoriteBtn() {
    if (!this.authService.isLoggedIn()) {
      this.postContainer.find('.grid-item').each((index, item) => {
        if ($(item).find('.save-btn').length === 0) {
          const favoriteBtn = document.createElement('img');
          favoriteBtn.className = 'save-btn';
          favoriteBtn.setAttribute('data-toggled', 'false');
          favoriteBtn.setAttribute('src', '/assets/res/favorite_border.png');
          favoriteBtn.setAttribute('data-href', $(item).attr('data-href'));
          const $favoriteBtn = $(favoriteBtn);
          $(item).find('span').append($favoriteBtn);
          $(item).find('span').addClass('fb-xfbml-parse-ignore');
        }
      });
    } else {
      this.updateFavoriteButton();
    }

    $('body').off('click').on('click', '.save-btn', (item) => {
      if (!this.authService.isLoggedIn()) {
        this.notifyService.printErrorMessage(MessageConstants.LOGIN_REQUIRED);
      } else {
        const btn = $(item.target);
        const postUrl = btn.attr('data-href');
        btn.attr('src', '/assets/res/loading_2.gif');
        if (btn.attr('data-toggled') === 'false') {
          this.postService.saveFavoritePost(postUrl).subscribe(() => {
            btn.attr('src', '/assets/res/favorite_fill.png');
            btn.attr('data-toggled', 'true');
            btn.prop('disabled', false);
          }, error => {
            btn.attr('src', '/assets/res/favorite_border.png');
            btn.prop('disabled', false);
            this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
            this.notifyService.handleError(error);
          });
        } else {
          this.postService.deleteFavoritePost(postUrl).subscribe(() => {
            btn.attr('src', '/assets/res/favorite_border.png');
            btn.attr('data-toggled', 'false');
            btn.prop('disabled', false);
          }, error => {
            btn.attr('src', '/assets/res/favorite_fill.png');
            btn.prop('disabled', false);
            this.notifyService.printErrorMessage(MessageConstants.SYSTEM_ERROR_MSG);
            this.notifyService.handleError(error);
          });
        }
      }
    });
  }

  resetFavoriteButton() {
    $('.save-btn').each((index, item) => {
      const btn = $(item);
      btn.attr('data-toggled', ' false');
      btn.attr('src', '/assets/res/favorite_border.png');
    });
  }

  updateFavoriteButton() {
    this.postService.getUserFavoritePostsUrl().subscribe((response: any[]) => {
      this.postContainer.find('.grid-item').each((index, item) => {
        if ($(item).find('.save-btn').length === 0) {
          const favoriteBtn = document.createElement('img');
          favoriteBtn.className = 'save-btn';
          if (response.indexOf($(item).attr('data-href')) === -1) {
            favoriteBtn.setAttribute('data-toggled', 'false');
            favoriteBtn.setAttribute('src', '/assets/res/favorite_border.png');
          } else {
            favoriteBtn.setAttribute('data-toggled', 'true');
            favoriteBtn.setAttribute('src', '/assets/res/favorite_fill.png');
          }
          favoriteBtn.setAttribute('data-href', $(item).attr('data-href'));
          const $favoriteBtn = $(favoriteBtn);
          $(item).find('span').append($favoriteBtn);
          $(item).find('span').addClass('fb-xfbml-parse-ignore');
        }
      });
    });
  }


  layoutIfNeeded() {
    let needUpdate = false;
    this.postContainer.find('.grid-item').each((index, item) => {
      if ($(item).height() !== $(item).attr('data-height')) {
        needUpdate = true;
      }
      $(item).attr('data-height', $(item).height());
    });
    if (this.postContainer.width() !== this.postContainer.attr('data-width')) {
      needUpdate = true;
    }
    this.postContainer.attr('data-width', this.postContainer.width());
    if (needUpdate) {
      this.relayout();
    }
  }

  relayout() {
    this.postContainer.isotope('layout');
  }

}
