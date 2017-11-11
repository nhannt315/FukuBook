import {Injectable} from '@angular/core';

declare let $: any;
declare let FB: any;
declare let Isotope: any;

@Injectable()
export class FbpostService {

  postContainer;
  iframeWidth = $(window).width() < 768 ? $(window).width() : 360;

  constructor() {
  }

  setRootContainer(containerId: String) {
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
  }

  getRootContainer(): any {
    return this.postContainer;
  }

  appendPost(postUrl: String) {
    const postContent = `<div class="fb-post grid-item" data-href="${postUrl}" data-width="${this.iframeWidth}"
                              data-show-text="true"></div>`;
    const $postContent = $(postContent);
    this.postContainer.append($postContent).isotope('appended', $postContent);
    this.relayout();
  }

  layoutIfNeeded() {
    let needUpdate = false;
    this.postContainer.find('.grid-item').each((index, item) => {
      if ($(item).height() !== $(item).attr('data-height')) {
        $(item).attr('data-height', $(item).height());
        needUpdate = true;
      }
    });
    if (needUpdate) {
      this.relayout();
    }
  }

  relayout() {
    this.postContainer.isotope('layout');
  }

}
