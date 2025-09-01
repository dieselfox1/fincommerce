/**
 * Internal dependencies
 */
import TYPES from './action-types';
export function getFieldsSuccess(fields) {
    return {
        type: TYPES.GET_FIELDS_SUCCESS,
        fields,
    };
}
export function getFieldsError(error) {
    return {
        type: TYPES.GET_FIELDS_ERROR,
        error,
    };
}
export function getProductFormSuccess(productForm) {
    return {
        type: TYPES.GET_PRODUCT_FORM_SUCCESS,
        fields: productForm.fields,
        sections: productForm.sections,
        subsections: productForm.subsections,
        tabs: productForm.tabs,
    };
}
export function getProductFormError(error) {
    return {
        type: TYPES.GET_PRODUCT_FORM_ERROR,
        error,
    };
}
