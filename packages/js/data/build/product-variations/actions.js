"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateProductVariations = void 0;
exports.generateProductVariationsError = generateProductVariationsError;
exports.generateProductVariationsRequest = generateProductVariationsRequest;
exports.generateProductVariationsSuccess = generateProductVariationsSuccess;
exports.batchUpdateProductVariationsError = batchUpdateProductVariationsError;
exports.batchUpdateProductVariations = batchUpdateProductVariations;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const utils_1 = require("../crud/utils");
const action_types_1 = __importDefault(require("./action-types"));
const constants_1 = require("./constants");
const crud_actions_1 = __importDefault(require("./crud-actions"));
function generateProductVariationsError(key, error) {
    return {
        type: action_types_1.default.GENERATE_VARIATIONS_ERROR,
        key,
        error,
        errorType: crud_actions_1.default.GENERATE_VARIATIONS,
    };
}
function generateProductVariationsRequest(key) {
    return {
        type: action_types_1.default.GENERATE_VARIATIONS_REQUEST,
        key,
    };
}
function generateProductVariationsSuccess(key) {
    return {
        type: action_types_1.default.GENERATE_VARIATIONS_SUCCESS,
        key,
    };
}
const generateProductVariations = function* (idQuery, productData, data, saveAttributes = true) {
    const urlParameters = (0, utils_1.getUrlParameters)(constants_1.WC_PRODUCT_VARIATIONS_NAMESPACE, idQuery);
    const { key } = (0, utils_1.parseId)(idQuery, urlParameters);
    yield generateProductVariationsRequest(key);
    if (saveAttributes) {
        try {
            yield data_1.controls.dispatch('core', 'saveEntityRecord', 'postType', 'product', {
                id: urlParameters[0],
                ...productData,
            });
        }
        catch (error) {
            yield generateProductVariationsError(key, error);
            throw error;
        }
    }
    try {
        const result = yield (0, data_controls_1.apiFetch)({
            path: (0, utils_1.getRestPath)(`${constants_1.WC_PRODUCT_VARIATIONS_NAMESPACE}/generate`, {}, urlParameters),
            method: 'POST',
            data,
        });
        yield generateProductVariationsSuccess(key);
        return result;
    }
    catch (error) {
        yield generateProductVariationsError(key, error);
        throw error;
    }
};
exports.generateProductVariations = generateProductVariations;
function batchUpdateProductVariationsError(key, error) {
    return {
        type: action_types_1.default.BATCH_UPDATE_VARIATIONS_ERROR,
        key,
        error,
        errorType: 'BATCH_UPDATE_VARIATIONS',
    };
}
function* batchUpdateProductVariations(idQuery, data) {
    const urlParameters = (0, utils_1.getUrlParameters)(constants_1.WC_PRODUCT_VARIATIONS_NAMESPACE, idQuery);
    try {
        const result = yield (0, data_controls_1.apiFetch)({
            path: (0, utils_1.getRestPath)(`${constants_1.WC_PRODUCT_VARIATIONS_NAMESPACE}/batch`, {}, urlParameters),
            method: 'POST',
            data,
        });
        return result;
    }
    catch (error) {
        const { key } = (0, utils_1.parseId)(idQuery, urlParameters);
        yield batchUpdateProductVariationsError(key, error);
        throw error;
    }
}
