import multik, { noop, first, last, deepEqual, isPrimitive } from './index';

describe('multik', () => {
  describe('matching Number values', () => {
    it('predicate as value', () => {
      const run = multik((n: number) => n, [1, () => '1'], [2, () => '2']);

      expect(run(1)).toBe('1');
      expect(run(2)).toBe('2');
    });

    it('custom predicate', () => {
      const run = multik(
        (n: number) => n,
        [(n) => n < 2, () => '1'],
        [(n) => n >= 2, () => '2'],
      );

      expect(run(1)).toBe('1');
      expect(run(2)).toBe('2');
    });

    it('OR predicate', () => {
      const run = multik((n: number) => n, [[2, 4], () => 'even'], [[1, 3], () => 'odd']);

      expect(run(1)).toBe('odd');
      expect(run(2)).toBe('even');
    });

    it('default predicate', () => {
      const run = multik(
        (n: number) => n,
        [(n) => n === 1, () => '1'],
        [(n) => n >= 2, () => '2'],
        [() => 'unknown'],
      );
      expect(run(1)).toBe('1');
      expect(run(2)).toBe('2');
      expect(run(0)).toBe('unknown');
    });

    it('access to multiple args and selector value', () => {
      const calc = multik(
        (n1: number, n2: number, op: string) => op,
        ['+', (op, n1, n2) => n1 + n2],
        ['-', (op, n1, n2) => n1 - n2],
      );

      expect(calc(1, 2, '+')).toBe(3);
      expect(calc(4, 2, '-')).toBe(2);
    });
  });

  describe('matching String values', () => {
    it('predicate as value', () => {
      const run = multik((s: string) => s, ['a', () => 0], ['b', () => 1]);

      expect(run('a')).toBe(0);
      expect(run('b')).toBe(1);
    });

    it('custom predicate', () => {
      const run = multik(
        (s: string) => s,
        [(s) => s.length === 0, () => 0],
        [(s) => s.length > 0, () => 1],
      );

      expect(run('')).toBe(0);
      expect(run('aaa')).toBe(1);
    });

    it('OR predicate', () => {
      const run = multik((s: string) => s, [['a', 'b'], () => 0], [['c', 'd'], () => 1]);

      expect(run('a')).toBe(0);
      expect(run('b')).toBe(0);
      expect(run('c')).toBe(1);
      expect(run('d')).toBe(1);
    });

    it('default predicate', () => {
      const run = multik((s: string) => s, [(s) => s.length === 0, () => 0], [() => 1]);

      expect(run('')).toBe(0);
      expect(run('aaa')).toBe(1);
    });
  });

  describe('matching Array values', () => {
    it('predicate as value', () => {
      const run = multik((a: any[]) => a, [[0, 0], () => 0], [[1, 1], () => 1]);

      expect(run([0, 0])).toBe(0);
      expect(run([1, 1])).toBe(1);
    });

    it('custom predicate', () => {
      const run = multik(
        (a: any[]) => a,
        [(a) => a[0] === 0, () => 0],
        [(a) => a[1] === 1, () => 1],
      );

      expect(run([0, 0])).toBe(0);
      expect(run([1, 1])).toBe(1);
    });

    it('OR predicate', () => {
      const run = multik(
        (a: any[]) => a,
        [
          [
            [0, 0],
            [1, 1],
          ],
          () => 0,
        ],
        [
          [
            [1, 1],
            [2, 2],
          ],
          () => 1,
        ],
      );

      expect(run([0, 0])).toBe(0);
      expect(run([1, 1])).toBe(0);
      expect(run([2, 2])).toBe(1);
    });

    it('default predicate', () => {
      const run = multik(
        (a: any[]) => a,
        [[0, 0], () => 0],
        [[1, 1], () => 1],
        [() => 2],
      );

      expect(run([0, 0])).toBe(0);
      expect(run([1, 1])).toBe(1);
      expect(run([2, 2])).toBe(2);
    });
  });

  describe('matching Object values', () => {
    it('predicate as value', () => {
      const run = multik(
        (o: { x: number; y: number }) => o,
        [{ x: 0, y: 0 }, () => 0],
        [{ x: 1, y: 1 }, () => 1],
      );

      expect(run({ x: 0, y: 0 })).toBe(0);
      expect(run({ x: 1, y: 1 })).toBe(1);
    });

    it('custom predicate', () => {
      const run = multik(
        (o: { x: number; y: number }) => o,
        [(o) => o.x === 0, () => 0],
        [(o) => o.y === 1, () => 1],
      );

      expect(run({ x: 0, y: 0 })).toBe(0);
      expect(run({ x: 1, y: 1 })).toBe(1);
    });

    it('OR predicate', () => {
      const run = multik(
        (o: { x: number; y: number }) => o,
        [
          [
            { x: 0, y: 0 },
            { x: 1, y: 1 },
          ],
          () => 0,
        ],
        [
          [
            { x: 0, y: 0 },
            { x: 2, y: 2 },
          ],
          () => 1,
        ],
      );

      expect(run({ x: 0, y: 0 })).toBe(0);
      expect(run({ x: 1, y: 1 })).toBe(0);
      expect(run({ x: 2, y: 2 })).toBe(1);
    });

    it('default predicate', () => {
      const run = multik(
        (o: { x: number; y: number }) => o,
        [{ x: 0, y: 0 }, () => 0],
        [{ x: 1, y: 1 }, () => 1],
        [() => 2],
      );

      expect(run({ x: 0, y: 0 })).toBe(0);
      expect(run({ x: 1, y: 1 })).toBe(1);
      expect(run({ x: 2, y: 1 })).toBe(2);
    });

    it('access to args and selector value', () => {
      const run = multik(
        (o: { id: number; coord: { x: number; y: number } }) => o.coord,
        [{ x: 0, y: 0 }, (coord, o) => `${o.id}`],
        [{ x: 1, y: 1 }, (coord, o) => `${o.id}`],
        [(coord) => `${coord.x}:${coord.y} not matched`],
      );

      expect(run({ id: 0, coord: { x: 0, y: 0 } })).toBe('0');
      expect(run({ id: 1, coord: { x: 1, y: 1 } })).toBe('1');
      expect(run({ id: 2, coord: { x: 2, y: 2 } })).toBe('2:2 not matched');
    });
  });
});

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
