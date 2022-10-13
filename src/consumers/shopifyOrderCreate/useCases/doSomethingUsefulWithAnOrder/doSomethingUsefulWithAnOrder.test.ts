import { ShopifyOrderObject } from '@dr-squatch/lib';
import {
  describe,
  test,
  expect,
} from '@jest/globals';
import { doSomethingUsefulWithAnOrder } from './doSomethingUsefulWithAnOrder';

describe('[doSomethingUsefulWithAnOrder] mainExportedFunction', () => {
  test('basic', () => {
    expect(doSomethingUsefulWithAnOrder({} as ShopifyOrderObject)).toBeTruthy();
  });
});