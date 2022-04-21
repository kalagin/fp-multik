import { noop, first, last, deepEqual, isPrimitive } from './utils';

describe('utils', () => {
  it('noop', () => {
    expect(noop()).toBeUndefined();
  });

  it('first', () => {
    expect(first([])).toBeUndefined();
    expect(first([1, 2])).toBe(1);
  });

  it('last', () => {
    expect(last([])).toBeUndefined();
    expect(last([1, 2])).toBe(2);
  });

  it('isPrimitive', () => {
    expect(isPrimitive(1)).toBeTruthy();
    expect(isPrimitive('s')).toBeTruthy();
    expect(isPrimitive(null)).toBeTruthy();
    expect(isPrimitive(undefined)).toBeTruthy();
    expect(isPrimitive(NaN)).toBeTruthy();

    expect(isPrimitive({})).toBeFalsy();
    expect(isPrimitive({ a: 1 })).toBeFalsy();
    expect(isPrimitive([])).toBeFalsy();
    expect(isPrimitive([1, 2])).toBeFalsy();
  });

  it('deepEqual', () => {
    expect(deepEqual(1, 1)).toBeTruthy();
    expect(deepEqual('s', 's')).toBeTruthy();

    expect(deepEqual([], [])).toBeTruthy();
    expect(deepEqual({}, {})).toBeTruthy();

    expect(deepEqual([1, 2], [1, 2])).toBeTruthy();
    expect(deepEqual([1, 2], [2, 1])).toBeFalsy();
    expect(deepEqual({ a: 1 }, { a: 1 })).toBeTruthy();
    expect(deepEqual({ b: 1 }, { a: 1 })).toBeFalsy();

    expect(deepEqual([1, [2]], [1, [2]])).toBeTruthy();
    expect(deepEqual([1, [2, [3, 4]]], [1, [2], [3, 4]])).toBeFalsy();
    expect(deepEqual([[1, 2], 2], [2, 1])).toBeFalsy();
    expect(deepEqual([1, { a: 1 }], [1, { a: 1 }])).toBeTruthy();
    expect(deepEqual([1, { a: 2 }], [1, { a: 1 }])).toBeFalsy();

    expect(deepEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } })).toBeTruthy();
    expect(deepEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 2 } })).toBeFalsy();

    expect(deepEqual({ a: 1, b: [1, 2] }, { a: 1, b: [1, 2] })).toBeTruthy();
    expect(deepEqual({ a: 1, b: [1, 2] }, { a: 1, b: [2, 2] })).toBeFalsy();
  });
});
