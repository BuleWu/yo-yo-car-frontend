import { TestBed } from '@angular/core/testing';

import { ReservationProviderService } from './reservation-provider.service';

describe('ReservationProviderService', () => {
  let service: ReservationProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
