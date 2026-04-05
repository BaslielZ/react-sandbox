import { expect, test } from 'vitest';
import { calculateSum } from './math';

test('calculates correct sum for items', () => {
  const mockCart = [{ price: 10 }, { price: 5 }];
  expect(calculateSum(mockCart)).toBe(15);
});