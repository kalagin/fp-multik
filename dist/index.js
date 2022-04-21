var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
define("utils", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.deepEqual = exports.isPrimitive = exports.last = exports.first = exports.noop = void 0;
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
        for (var key in obj1) {
            if (!(key in obj2))
                return false;
            if (!deepEqual(obj1[key], obj2[key]))
                return false;
        }
        return true;
    }
    exports.deepEqual = deepEqual;
});
define("index", ["require", "exports", "utils"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.multik = void 0;
    function multik(selectorFn) {
        var predicateAsAction = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            predicateAsAction[_i - 1] = arguments[_i];
        }
        var predicates = Object.fromEntries(predicateAsAction);
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var selector = selectorFn.apply(void 0, args);
            if (predicates[selector] && (0, utils_1.isPrimitive)(selector)) {
                return predicates[selector].apply(predicates, __spreadArray([selector], args, false));
            }
            var defaultAction = utils_1.noop;
            for (var i = 0; i < predicateAsAction.length; i++) {
                var predicate = (0, utils_1.first)(predicateAsAction[i]);
                var action = (0, utils_1.last)(predicateAsAction[i]);
                if ((0, utils_1.isPrimitive)(predicate)) {
                    continue;
                }
                if (typeof predicate === 'object' && (0, utils_1.deepEqual)(selector, predicate)) {
                    return action.call.apply(action, __spreadArray([null, selector], args, false));
                }
                if (predicateAsAction[i].length === 1 && typeof predicate === 'function') {
                    defaultAction = predicate.bind.apply(predicate, __spreadArray([null, selector], args, false));
                }
                if (predicateAsAction[i].length === 2 &&
                    typeof predicate === 'function' &&
                    typeof action === 'function' && predicate.apply(void 0, __spreadArray([selector], args, false))) {
                    return action.call.apply(action, __spreadArray([null, selector], args, false));
                }
                if (!(0, utils_1.isPrimitive)(selector) &&
                    Array.isArray(predicate) &&
                    predicate.includes(selector)) {
                    return action.call.apply(action, __spreadArray([null, selector], args, false));
                }
                if (Array.isArray(predicate) && predicate.some(function (p) { return (0, utils_1.deepEqual)(p, selector); })) {
                    return action.call.apply(action, __spreadArray([null, selector], args, false));
                }
            }
            return defaultAction();
        };
    }
    exports.multik = multik;
    exports.default = multik;
});
