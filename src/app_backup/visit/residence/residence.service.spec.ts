import { TestBed, inject } from '@angular/core/testing';

import { ResidenceService } from './residence.service';

describe('ResidenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResidenceService]
    });
  });

  it('should be created', inject([ResidenceService], (service: ResidenceService) => {
    expect(service).toBeTruthy();
  }));
});
