import { noop, first, last, isPrimitive, deepEqual } from './utils';

export function multik<S, R, T1>(
  selectorFn: (arg1: T1) => S,
  ...predicateAsAction: Array<
    | [predicateValue: S, action: (selector: S, arg1: T1) => R]
    | [predicateOr: S[], action: (selector: S, arg1: T1) => R]
    | [
        predicate: (selector: S, arg1: T1) => boolean,
        action: (selector: S, arg1: T1) => R,
      ]
    | [action: (selector: S, arg1: T1) => R]
  >
): (arg1: T1) => R;

export function multik<S, R, T1, T2>(
  selectorFn: (arg1: T1, arg2: T2) => S,
  ...predicateAsAction: Array<
    | [predicateValue: S, action: (selector: S, arg1: T1, arg2: T2) => R]
    | [predicateOr: S[], action: (selector: S, arg1: T1, arg2: T2) => R]
    | [
        predicate: (selector: S, arg1: T1, arg2: T2) => boolean,
        action: (selector: S, arg1: T1, arg2: T2) => R,
      ]
    | [action: (selector: S, arg1: T1, arg2: T2) => R]
  >
): (arg1: T1, arg2: T2) => R;

export function multik<S, R, T1, T2, T3>(
  selectorFn: (arg1: T1, arg2: T2, arg3: T3) => S,
  ...predicateAsAction: Array<
    | [predicateValue: S, action: (selector: S, arg1: T1, arg2: T2, arg3: T3) => R]
    | [predicateOr: S[], action: (selector: S, arg1: T1, arg2: T2, arg3: T3) => R]
    | [
        predicate: (selector: S, arg1: T1, arg2: T2, arg3: T3) => boolean,
        action: (selector: S, arg1: T1, arg2: T2, arg3: T3) => R,
      ]
    | [action: (selector: S, arg1: T1, arg2: T2, arg3: T3) => R]
  >
): (arg1: T1, arg2: T2, arg3: T3) => R;

export function multik<S, R, T1, T2, T3, T4>(
  selectorFn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => S,
  ...predicateAsAction: Array<
    | [
        predicateValue: S,
        action: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
      ]
    | [
        predicateOr: S[],
        action: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
      ]
    | [
        predicate: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => boolean,
        action: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R,
      ]
    | [action: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R]
  >
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => R;

export function multik<S, R, T1, T2, T3, T4, T5>(
  selectorFn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => S,
  ...predicateAsAction: Array<
    | [
        predicateValue: S,
        action: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R,
      ]
    | [
        predicateOr: S[],
        action: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R,
      ]
    | [
        predicate: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
        ) => boolean,
        action: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R,
      ]
    | [action: (selector: S, arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R]
  >
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5) => R;

export function multik<S, R, T1, T2, T3, T4, T5, T6>(
  selectorFn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => S,
  ...predicateAsAction: Array<
    | [
        predicateValue: S,
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
        ) => R,
      ]
    | [
        predicateOr: S[],
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
        ) => R,
      ]
    | [
        predicate: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
        ) => boolean,
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
        ) => R,
      ]
    | [
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
        ) => R,
      ]
  >
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6) => R;

export function multik<S, R, T1, T2, T3, T4, T5, T6, T7>(
  selectorFn: (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => S,
  ...predicateAsAction: Array<
    | [
        predicateValue: S,
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
        ) => R,
      ]
    | [
        predicateOr: S[],
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
        ) => R,
      ]
    | [
        predicate: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
        ) => boolean,
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
        ) => R,
      ]
    | [
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
        ) => R,
      ]
  >
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7) => R;

export function multik<S, R, T1, T2, T3, T4, T5, T6, T7, T8>(
  selectorFn: (
    arg1: T1,
    arg2: T2,
    arg3: T3,
    arg4: T4,
    arg5: T5,
    arg6: T6,
    arg7: T7,
    arg8: T8,
  ) => S,
  ...predicateAsAction: Array<
    | [
        predicateValue: S,
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
          arg8: T8,
        ) => R,
      ]
    | [
        predicateOr: S[],
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
          arg8: T8,
        ) => R,
      ]
    | [
        predicate: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
          arg8: T8,
        ) => boolean,
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
          arg8: T8,
        ) => R,
      ]
    | [
        action: (
          selector: S,
          arg1: T1,
          arg2: T2,
          arg3: T3,
          arg4: T4,
          arg5: T5,
          arg6: T6,
          arg7: T7,
          arg8: T8,
        ) => R,
      ]
  >
): (arg1: T1, arg2: T2, arg3: T3, arg4: T4, arg5: T5, arg6: T6, arg7: T7, arg8: T8) => R;

export function multik(selectorFn: any, ...predicateAsAction: any[]) {
  const predicates = Object.fromEntries(predicateAsAction);

  return (...args: unknown[]) => {
    const selector = selectorFn(...args);
    if (predicates[selector] && isPrimitive(selector)) {
      return predicates[selector](selector, ...args);
    }

    let defaultAction = noop;
    for (let i = 0; i < predicateAsAction.length; i++) {
      const predicate = first(predicateAsAction[i]);
      const action = last(predicateAsAction[i]);

      if (isPrimitive(predicate)) {
        continue;
      }

      if (typeof predicate === 'object' && deepEqual(selector, predicate)) {
        return action.call(null, selector, ...args);
      }

      if (predicateAsAction[i].length === 1 && typeof predicate === 'function') {
        defaultAction = predicate.bind(null, selector, ...args);
      }

      if (
        predicateAsAction[i].length === 2 &&
        typeof predicate === 'function' &&
        typeof action === 'function' &&
        predicate(selector, ...args)
      ) {
        return action.call(null, selector, ...args);
      }

      if (
        !isPrimitive(selector) &&
        Array.isArray(predicate) &&
        predicate.includes(selector)
      ) {
        return action.call(null, selector, ...args);
      }

      if (Array.isArray(predicate) && predicate.some((p) => deepEqual(p, selector))) {
        return action.call(null, selector, ...args);
      }
    }

    return defaultAction();
  };
}

export default multik;
