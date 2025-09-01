"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveOptions = receiveOptions;
exports.setRequestingError = setRequestingError;
exports.setUpdatingError = setUpdatingError;
exports.setIsUpdating = setIsUpdating;
exports.updateOptions = updateOptions;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const constants_1 = require("../constants");
function receiveOptions(options) {
    return {
        type: action_types_1.default.RECEIVE_OPTIONS,
        options,
    };
}
function setRequestingError(error, name) {
    return {
        type: action_types_1.default.SET_REQUESTING_ERROR,
        error,
        name,
    };
}
function setUpdatingError(error) {
    return {
        type: action_types_1.default.SET_UPDATING_ERROR,
        error,
    };
}
function setIsUpdating(isUpdating) {
    return {
        type: action_types_1.default.SET_IS_UPDATING,
        isUpdating,
    };
}
function* updateOptions(data) {
    try {
        yield setIsUpdating(true);
        const results = yield (0, data_controls_1.apiFetch)({
            path: constants_1.WC_ADMIN_NAMESPACE + '/options',
            method: 'POST',
            data,
        });
        yield setIsUpdating(false);
        if (typeof results !== 'object') {
            throw new Error(`Invalid update options response from server: ${results}`);
        }
        yield receiveOptions(data);
        return { success: true, ...results };
    }
    catch (error) {
        yield setUpdatingError(error);
        if (typeof error !== 'object') {
            throw new Error(`Unexpected error: ${error}`);
        }
        return { success: false, ...error };
    }
}
