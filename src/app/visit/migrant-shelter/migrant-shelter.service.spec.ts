import { TestBed, inject } from '@angular/core/testing';

import { MigrantShelterService } from './migrant-shelter.service';

describe('MigrantShelterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MigrantShelterService]
    });
  });

  it('should be created', inject([MigrantShelterService], (service: MigrantShelterService) => {
    expect(service).toBeTruthy();
  }));
});
