"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormContext = void 0;
exports.useFormContext = useFormContext;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
exports.FormContext = (0, element_1.createContext)({});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFormContext() {
    const formContext = (0, element_1.useContext)(exports.FormContext);
    return formContext;
}
