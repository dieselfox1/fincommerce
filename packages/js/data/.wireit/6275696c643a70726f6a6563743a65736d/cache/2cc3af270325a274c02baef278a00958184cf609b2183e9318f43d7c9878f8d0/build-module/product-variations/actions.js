/**
 * External dependencies
 */
import { apiFetch } from '@wordpress/data-controls';
import { controls } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { getUrlParameters, getRestPath, parseId } from '../crud/utils';
import TYPES from './action-types';
import { WC_PRODUCT_VARIATIONS_NAMESPACE } from './constants';
import CRUD_ACTIONS from './crud-actions';
export function generateProductVariationsError(key, error) {
    return {
        type: TYPES.GENERATE_VARIATIONS_ERROR,
        key,
        error,
        errorType: CRUD_ACTIONS.GENERATE_VARIATIONS,
    };
}
export function generateProductVariationsRequest(key) {
    return {
        type: TYPES.GENERATE_VARIATIONS_REQUEST,
        key,
    };
}
export function generateProductVariationsSuccess(key) {
    return {
        type: TYPES.GENERATE_VARIATIONS_SUCCESS,
        key,
    };
}
export const generateProductVariations = function* (idQuery, productData, data, saveAttributes = true) {
    const urlParameters = getUrlParameters(WC_PRODUCT_VARIATIONS_NAMESPACE, idQuery);
    const { key } = parseId(idQuery, urlParameters);
    yield generateProductVariationsRequest(key);
    if (saveAttributes) {
        try {
            yield controls.dispatch('core', 'saveEntityRecord', 'postType', 'product', {
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
        const result = yield apiFetch({
            path: getRestPath(`${WC_PRODUCT_VARIATIONS_NAMESPACE}/generate`, {}, urlParameters),
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
export function batchUpdateProductVariationsError(key, error) {
    return {
        type: TYPES.BATCH_UPDATE_VARIATIONS_ERROR,
        key,
        error,
        errorType: 'BATCH_UPDATE_VARIATIONS',
    };
}
export function* batchUpdateProductVariations(idQuery, data) {
    const urlParameters = getUrlParameters(WC_PRODUCT_VARIATIONS_NAMESPACE, idQuery);
    try {
        const result = yield apiFetch({
            path: getRestPath(`${WC_PRODUCT_VARIATIONS_NAMESPACE}/batch`, {}, urlParameters),
            method: 'POST',
            data,
        });
        return result;
    }
    catch (error) {
        const { key } = parseId(idQuery, urlParameters);
        yield batchUpdateProductVariationsError(key, error);
        throw error;
    }
}
