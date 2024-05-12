import { TestBed } from '@angular/core/testing';

import { SleepSessionsService } from './sleep-sessions.service';

describe('SleepSessionsService', () => {
  let service: SleepSessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepSessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
