import {Injectable} from '@angular/core';
import {Post} from '../../models/models.component';

declare let $: any;
declare let FB: any;
declare let Isotope: any;

@Injectable()
export class FbpostService {

  private postContainer;
  private tempPostContainer;
  iframeWidth = $(window).width() < 768 ? $(window).width() : 360;

  constructor() {
  }

  setRootContainer(containerId: String, tempContainerID: String) {
    this.postContainer = $(containerId).isotope({
      masonry: {
        columnWidth: this.iframeWidth,
        gutter: 10,
        fitWidth: false
      },
      itemSelector: '.grid-item',
      isAnimated: true,
      animationOptions: {
        duration: 750,
        easing: 'linear',
        queue: false
      }
    });
    this.tempPostContainer = $(tempContainerID);
  }

  getRootContainer(): any {
    return this.postContainer;
  }

  addPost(postList: Post[], callback) {
    for (const post of postList) {
      const postContent = `<div class="fb-post grid-item" data-href="${post.permalink_url}" data-width="${this.iframeWidth}"
                              data-show-text="true"></div>`;
      const $postContent = $(postContent);
      this.tempPostContainer.append($postContent);
      this.relayout();
    }
    FB.XFBML.parse(this.tempPostContainer[0], () => {
      this.tempPostContainer.children().each((index, obj) => {
        this.postContainer.append($(obj)).isotope('appended', $(obj));
        this.relayout();
      });
      this.tempPostContainer.empty();
      this.relayout();
      callback();
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
