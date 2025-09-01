export function isCustomField(customField) {
    return !customField.key.startsWith('_') && customField.value !== null;
}
export function disjoinMetas(state, meta) {
    if (isCustomField(meta)) {
        state.customFields.push(meta);
    }
    else {
        state.otherMetas.push(meta);
    }
    return state;
}
