export declare function noop(): void;
export declare function first(arr: readonly any[]): any;
export declare function last(arr: readonly any[]): any;
export default function multik<T = unknown, S = any, R = unknown>(selectorFn: (data: T) => S, ...predicateAsAction: Array<[predicate: S, action: (data?: T, selector?: S) => R] | [predicate: S[], action: (data?: T, selector?: S) => R] | [predicate: () => Promise<R>, action: (data?: T, selector?: S) => R] | [
    predicate: (data?: T, selector?: S) => boolean,
    action: (data?: T, selector?: S) => R
] | [action: (data?: T, selector?: S) => R]>): (data: T) => R;
