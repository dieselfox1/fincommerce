"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationContext = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.ValidationContext = (0, element_1.createContext)({
    errors: {},
    getFieldByValidatorId: () => ({}),
    registerValidator: () => () => { },
    unRegisterValidator: () => () => { },
    validateField: () => Promise.resolve(undefined),
    validateAll: () => Promise.resolve({}),
});
