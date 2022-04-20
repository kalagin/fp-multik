// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function first(arr: readonly any[]) {
  return arr[0];
}

export function last(arr: readonly any[]) {
  return arr[arr.length - 1];
}

export default function multik<T = unknown, S = any, R = unknown>(
  selectorFn: (data: T) => S,
  ...predicateAsAction: Array<
    | [predicate: S, action: (data?: T, selector?: S) => R]
    | [predicate: S[], action: (data?: T, selector?: S) => R]
    | [predicate: () => Promise<R>, action: (data?: T, selector?: S) => R]
    | [
        predicate: (data?: T, selector?: S) => boolean,
        action: (data?: T, selector?: S) => R,
      ]
    | [action: (data?: T, selector?: S) => R]
  >
): (data: T) => R {
  const predicates = Object.fromEntries(predicateAsAction);

  return (...args) => {
    const selector = selectorFn(...args);
    if (predicates[selector]) {
      return predicates[selector](...args, selector);
    }

    let defaultAction = noop;
    for (let i = 0; i < predicateAsAction.length; i++) {
      const predicate = first(predicateAsAction[i]);
      const action = last(predicateAsAction[i]);

      if (typeof predicate === 'string') {
        continue;
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
