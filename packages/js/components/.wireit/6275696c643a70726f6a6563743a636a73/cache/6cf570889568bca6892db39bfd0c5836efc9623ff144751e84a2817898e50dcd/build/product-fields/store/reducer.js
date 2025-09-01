"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const reducer = (state = {
    fields: {},
}, payload) => {
    if (payload && 'type' in payload) {
        switch (payload.type) {
            case action_types_1.default.REGISTER_FIELD:
                return {
                    ...state,
                    fields: {
                        ...state.fields,
                        [payload.field.name]: payload.field,
                    },
                };
            default:
                return state;
        }
    }
    return state;
};
exports.default = reducer;
