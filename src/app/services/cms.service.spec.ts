import { TestBed } from '@angular/core/testing';

import { CMSService } from './cms.service';

describe('CMSserviceService', () => {
  let service: CMSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CMSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
