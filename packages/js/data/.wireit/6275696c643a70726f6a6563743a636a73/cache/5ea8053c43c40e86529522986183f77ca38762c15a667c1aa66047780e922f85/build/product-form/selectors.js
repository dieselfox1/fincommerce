"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductForm = exports.getField = exports.getFields = void 0;
const getFields = (state) => {
    return state.fields;
};
exports.getFields = getFields;
const getField = (state, id) => {
    return state.fields.find((field) => field.id === id);
};
exports.getField = getField;
const getProductForm = (state) => {
    const { errors, ...form } = state;
    return form;
};
exports.getProductForm = getProductForm;
