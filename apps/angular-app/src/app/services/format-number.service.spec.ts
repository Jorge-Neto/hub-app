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

  it('should return 0 if the value is empty', () => {
    expect(service.format('')).toBe(0);
    expect(service.format(null as any)).toBe(0);
    expect(service.format(undefined as any)).toBe(0);
  });

  it('should convert string with semicolons correctly', () => {
    expect(service.format('1.234,56')).toBeCloseTo(1234.56);
    expect(service.format('12.345.678,90')).toBeCloseTo(12345678.90);
  });

  it('should return 0 if string is not a valid number', () => {
    expect(service.format('abc')).toBeNaN(); // pois Number('abc') = NaN
  });
});
