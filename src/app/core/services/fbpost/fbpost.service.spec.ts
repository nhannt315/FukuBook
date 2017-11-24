import {inject, TestBed} from '@angular/core/testing';

import {FbpostService} from './fbpost.service';

describe('FbpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbpostService]
    });
  });

  it('should be created', inject([FbpostService], (service: FbpostService) => {
    expect(service).toBeTruthy();
  }));
});
