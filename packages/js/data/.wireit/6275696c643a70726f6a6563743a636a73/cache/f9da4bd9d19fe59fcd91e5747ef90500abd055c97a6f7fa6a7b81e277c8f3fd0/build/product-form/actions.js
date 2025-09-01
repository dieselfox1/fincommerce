"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldsSuccess = getFieldsSuccess;
exports.getFieldsError = getFieldsError;
exports.getProductFormSuccess = getProductFormSuccess;
exports.getProductFormError = getProductFormError;
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
function getFieldsSuccess(fields) {
    return {
        type: action_types_1.default.GET_FIELDS_SUCCESS,
        fields,
    };
}
function getFieldsError(error) {
    return {
        type: action_types_1.default.GET_FIELDS_ERROR,
        error,
    };
}
function getProductFormSuccess(productForm) {
    return {
        type: action_types_1.default.GET_PRODUCT_FORM_SUCCESS,
        fields: productForm.fields,
        sections: productForm.sections,
        subsections: productForm.subsections,
        tabs: productForm.tabs,
    };
}
function getProductFormError(error) {
    return {
        type: action_types_1.default.GET_PRODUCT_FORM_ERROR,
        error,
    };
}
