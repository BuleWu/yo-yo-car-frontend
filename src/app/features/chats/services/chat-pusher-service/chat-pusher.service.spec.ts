import { TestBed } from '@angular/core/testing';

import { ChatPusherService } from './chat-pusher.service';

describe('ChatPusherService', () => {
  let service: ChatPusherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPusherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
