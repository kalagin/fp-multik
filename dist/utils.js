"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepEqual = exports.isPrimitive = exports.last = exports.first = exports.noop = void 0;
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
