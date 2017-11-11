import {Injectable} from '@angular/core';

declare let $: any;
declare let FB: any;
declare let Isotope: any;

@Injectable()
export class FbpostService {

  private postContainer: any;
  dataCache;
  pageCount = 1;
  startedSearch = false;
  searchType = 0;
  isLoading = false;
  isEndPage = false;
  iframeWidth = $(window).width() < 768 ? $(window).width() : 360;
  numberOfCategoriesLoaded = 0;

  $grid: any;

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
    const postContent = `<div class="fb-post" data-href="${postUrl}" data-width="${this.iframeWidth}" data-show-text="true"></div>`;
    const $postContent = $(postContent);
    this.postContainer.append($postContent).isotope('appended', $postContent);
    this.postContainer.isotope('layout');
  }

}
