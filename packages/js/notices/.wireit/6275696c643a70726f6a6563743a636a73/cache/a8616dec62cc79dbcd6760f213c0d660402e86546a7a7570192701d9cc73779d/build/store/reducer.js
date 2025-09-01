"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const lodash_1 = require("lodash");
/**
 * Internal dependencies
 */
const on_sub_key_1 = __importDefault(require("./utils/on-sub-key"));
/**
 * Reducer returning the next notices state. The notices state is an array of notice objects
 *
 * @param {Array}  state  Current state.
 * @param {Object} action Dispatched action.
 *
 * @return {Object} Updated state.
 */
const notices = (state = [], action) => {
    switch (action.type) {
        case 'CREATE_NOTICE':
            // Avoid duplicates on ID.
            return [
                ...(0, lodash_1.reject)(state, { id: action.notice.id }),
                action.notice,
            ];
        case 'REMOVE_NOTICE':
            return (0, lodash_1.reject)(state, { id: action.id });
    }
    return state;
};
// Creates a combined reducer object where each key is a context, its value an array of notice objects.
exports.default = (0, on_sub_key_1.default)('context')(notices);
