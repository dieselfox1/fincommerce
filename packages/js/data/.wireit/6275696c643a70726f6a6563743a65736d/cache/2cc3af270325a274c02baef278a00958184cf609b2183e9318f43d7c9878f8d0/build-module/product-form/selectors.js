export const getFields = (state) => {
    return state.fields;
};
export const getField = (state, id) => {
    return state.fields.find((field) => field.id === id);
};
export const getProductForm = (state) => {
    const { errors, ...form } = state;
    return form;
};
