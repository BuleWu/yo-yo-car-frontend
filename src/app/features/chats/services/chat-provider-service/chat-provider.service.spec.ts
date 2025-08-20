import { TestBed } from '@angular/core/testing';

import { ChatProviderService } from './chat-provider.service';

describe('ChatProviderService', () => {
  let service: ChatProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
