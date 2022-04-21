"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multik = exports.deepEqual = exports.isPrimitive = exports.last = exports.first = exports.noop = void 0;
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
function isPrimitive(obj) {
    return obj !== Object(obj);
}
exports.isPrimitive = isPrimitive;
function deepEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (isPrimitive(obj1) && isPrimitive(obj2))
        return obj1 === obj2;
    if (Object.keys(obj1).length !== Object.keys(obj2).length)
        return false;
    for (const key in obj1) {
        if (!(key in obj2))
            return false;
        if (!deepEqual(obj1[key], obj2[key]))
            return false;
    }
    return true;
}
exports.deepEqual = deepEqual;
function multik(selectorFn, ...predicateAsAction) {
    const predicates = Object.fromEntries(predicateAsAction);
    return (...args) => {
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
            if (predicateAsAction[i].length === 2 &&
                typeof predicate === 'function' &&
                typeof action === 'function' &&
                predicate(selector, ...args)) {
                return action.call(null, selector, ...args);
            }
            if (!isPrimitive(selector) &&
                Array.isArray(predicate) &&
                predicate.includes(selector)) {
                return action.call(null, selector, ...args);
            }
            if (Array.isArray(predicate) && predicate.some((p) => deepEqual(p, selector))) {
                return action.call(null, selector, ...args);
            }
        }
        return defaultAction();
    };
}
exports.multik = multik;
exports.default = multik;
