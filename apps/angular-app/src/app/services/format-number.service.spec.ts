import { TestBed } from '@angular/core/testing';

import { FormatNumberService } from './format-number.service';

describe('FormatNumberService', () => {
  let service: FormatNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
