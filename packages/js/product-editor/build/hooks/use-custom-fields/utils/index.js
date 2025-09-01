"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomField = isCustomField;
exports.disjoinMetas = disjoinMetas;
function isCustomField(customField) {
    return !customField.key.startsWith('_') && customField.value !== null;
}
function disjoinMetas(state, meta) {
    if (isCustomField(meta)) {
        state.customFields.push(meta);
    }
    else {
        state.otherMetas.push(meta);
    }
    return state;
}
