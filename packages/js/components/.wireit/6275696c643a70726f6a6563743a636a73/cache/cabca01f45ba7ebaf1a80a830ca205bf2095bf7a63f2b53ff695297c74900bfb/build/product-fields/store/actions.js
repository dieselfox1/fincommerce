"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerProductField = registerProductField;
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
function registerProductField(field) {
    return {
        type: action_types_1.default.REGISTER_FIELD,
        field,
    };
}
