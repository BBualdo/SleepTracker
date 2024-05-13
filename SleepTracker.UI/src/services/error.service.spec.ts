import { TestBed } from '@angular/core/testing';

import { ErrorsService } from './errors.service';

describe('ErrorService', () => {
  let service: ErrorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
