import { TestBed } from '@angular/core/testing';

import { SockectioService } from './sockectio.service';

describe('SockectioService', () => {
  let service: SockectioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SockectioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
