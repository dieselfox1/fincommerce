/**
 * External dependencies
 */
import { apiFetch } from '@wordpress/data-controls';
/**
 * Internal dependencies
 */
import { getFieldsSuccess, getFieldsError, getProductFormSuccess, getProductFormError, } from './actions';
import { WC_ADMIN_NAMESPACE } from '../constants';
export function* getFields() {
    try {
        const url = WC_ADMIN_NAMESPACE + '/product-form/fields';
        const results = yield apiFetch({
            path: url,
            method: 'GET',
        });
        return getFieldsSuccess(results);
    }
    catch (error) {
        return getFieldsError(error);
    }
}
export function* getProductForm() {
    try {
        const url = WC_ADMIN_NAMESPACE + '/product-form';
        const results = yield apiFetch({
            path: url,
            method: 'GET',
        });
        return getProductFormSuccess(results);
    }
    catch (error) {
        return getProductFormError(error);
    }
}
