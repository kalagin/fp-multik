"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multik = void 0;
const utils_1 = require("./utils");
function multik(selectorFn, ...predicateAsAction) {
    const predicates = Object.fromEntries(predicateAsAction);
    return (...args) => {
        const selector = selectorFn(...args);
        if (predicates[selector] && (0, utils_1.isPrimitive)(selector)) {
            return predicates[selector](selector, ...args);
        }
        let defaultAction = utils_1.noop;
        for (let i = 0; i < predicateAsAction.length; i++) {
            const predicate = (0, utils_1.first)(predicateAsAction[i]);
            const action = (0, utils_1.last)(predicateAsAction[i]);
            if ((0, utils_1.isPrimitive)(predicate)) {
                continue;
            }
            if (typeof predicate === 'object' && (0, utils_1.deepEqual)(selector, predicate)) {
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
            if (!(0, utils_1.isPrimitive)(selector) &&
                Array.isArray(predicate) &&
                predicate.includes(selector)) {
                return action.call(null, selector, ...args);
            }
            if (Array.isArray(predicate) && predicate.some((p) => (0, utils_1.deepEqual)(p, selector))) {
                return action.call(null, selector, ...args);
            }
        }
        return defaultAction();
    };
}
exports.multik = multik;
exports.default = multik;
