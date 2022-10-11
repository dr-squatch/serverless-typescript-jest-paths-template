import {
  describe,
  test,
  expect,
} from '@jest/globals';
import { s3 } from './s3';

describe('[lib/aws] s3', () => {
  test('should be a singleton with basic functionality', () => {
    expect(typeof s3.getObject === 'function').toBeTruthy();
  });
});