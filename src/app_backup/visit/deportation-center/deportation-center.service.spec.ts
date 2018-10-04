import { TestBed, inject } from '@angular/core/testing';

import { DeportationCenterService } from './deportation-center.service';

describe('DeportationCenterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeportationCenterService]
    });
  });

  it('should be created', inject([DeportationCenterService], (service: DeportationCenterService) => {
    expect(service).toBeTruthy();
  }));
});
