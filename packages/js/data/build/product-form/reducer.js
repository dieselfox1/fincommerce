"use strict";
/**
 * External dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const reducer = (state = {
    errors: {},
    fields: [],
    sections: [],
    subsections: [],
    tabs: [],
}, action) => {
    switch (action.type) {
        case action_types_1.default.GET_FIELDS_SUCCESS:
            state = {
                ...state,
                fields: action.fields,
            };
            break;
        case action_types_1.default.GET_FIELDS_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    fields: action.error,
                },
            };
            break;
        case action_types_1.default.GET_PRODUCT_FORM_SUCCESS:
            state = {
                ...state,
                fields: action.fields,
                sections: action.sections,
                subsections: action.subsections,
                tabs: action.tabs,
            };
            break;
        case action_types_1.default.GET_PRODUCT_FORM_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    fields: action.error,
                    sections: action.error,
                    subsections: action.error,
                },
            };
            break;
    }
    return state;
};
exports.default = reducer;
