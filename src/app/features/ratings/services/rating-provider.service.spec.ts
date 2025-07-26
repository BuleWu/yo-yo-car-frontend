import { TestBed } from '@angular/core/testing';

import { RatingProviderService } from './rating-provider.service';

describe('RatingProviderService', () => {
  let service: RatingProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RatingProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
