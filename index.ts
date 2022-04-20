export function noop() {}

export function first(arr: readonly any[]) {
  return arr[0];
}

export function last(arr: readonly any[]) {
  return arr[arr.length - 1];
}

export function isPrimitive(obj: any) {
  return obj !== Object(obj);
}

export function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;
  if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (let key in obj1) {
    if (!(key in obj2)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

export default function multik<T = unknown, S = any, R = unknown>(
  selectorFn: (arg: T) => S,
  ...predicateAsAction: Array<
    | [predicateValue: S, action: (arg: T, selector: S) => R]
    | [predicateOr: S[], action: (arg: T, selector: S) => R]
    | [predicate: (arg: T, selector: S) => boolean, action: (arg: T, selector: S) => R]
    | [action: (arg: T, selector: S) => R]
  >
): (arg: T) => R {
  const predicates = Object.fromEntries(predicateAsAction);

  return (...args) => {
    const selector = selectorFn(...args);
    if (
      predicates[selector] &&
      (typeof selector === 'string' || typeof selector === 'number')
    ) {
      return predicates[selector](...args, selector);
    }

    let defaultAction = noop;
    for (let i = 0; i < predicateAsAction.length; i++) {
      const predicate = first(predicateAsAction[i]);
      const action = last(predicateAsAction[i]);

      if (typeof predicate === 'string' || typeof predicate === 'number') {
        continue;
      }

      if (typeof predicate === 'object' && deepEqual(selector, predicate)) {
        return action();
      }

      if (predicateAsAction[i].length === 1 && typeof predicate === 'function') {
        defaultAction = predicate.bind(null, ...args, selector);
      }

      if (
        predicateAsAction[i].length === 2 &&
        typeof predicate === 'function' &&
        typeof action === 'function' &&
        predicate(...args, selector)
      ) {
        return action();
      }

      if (Array.isArray(predicate) && predicate.includes(selector)) {
        return action();
      }
    }

    return defaultAction();
  };
}
