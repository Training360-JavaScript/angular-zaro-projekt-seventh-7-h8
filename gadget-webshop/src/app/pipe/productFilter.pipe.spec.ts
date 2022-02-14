import { ProductFilterPipe } from './productFilter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new ProductFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
