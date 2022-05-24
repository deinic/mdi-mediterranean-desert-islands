import { TestBed } from '@angular/core/testing';

import { DarkskyService } from './darksky.service';

describe('DarkskyService', () => {
  let service: DarkskyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkskyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
