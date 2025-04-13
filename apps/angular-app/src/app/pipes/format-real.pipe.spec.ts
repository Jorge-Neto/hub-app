import { FormatRealPipe } from './format-real.pipe';

describe('FormatRealPipe', () => {
  const pipe = new FormatRealPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('must format number to real (pt-BR)', () => {
    expect(pipe.transform(1234.56)).toBe('R$ 1.234,56');
    expect(pipe.transform(0)).toBe('R$ 0,00');
    expect(pipe.transform(1000000)).toBe('R$ 1.000.000,00');
  });

  it('must handle negative values', () => {
    expect(pipe.transform(-89.5)).toBe('-R$ 89,50');
  });
});
