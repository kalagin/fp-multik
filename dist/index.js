"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.last = exports.first = exports.noop = void 0;
// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() { }
exports.noop = noop;
function first(arr) {
    return arr[0];
}
exports.first = first;
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
function multik(selectorFn, ...predicateAsAction) {
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
            if (predicateAsAction[i].length === 2 &&
                typeof predicate === 'function' &&
                typeof action === 'function' &&
                predicate(...args, selector)) {
                return action();
            }
            if (Array.isArray(predicate) && predicate.includes(selector)) {
                return action();
            }
        }
        return defaultAction();
    };
}
exports.default = multik;
