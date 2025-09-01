"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegisteredProductFields = void 0;
exports.getProductField = getProductField;
/**
 * External dependencies
 */
const memoize_one_1 = __importDefault(require("memoize-one"));
function getProductField(state, name) {
    return state.fields[name] || null;
}
exports.getRegisteredProductFields = (0, memoize_one_1.default)((state) => Object.keys(state.fields), ([newState], [oldState]) => {
    return newState.fields === oldState.fields;
});
