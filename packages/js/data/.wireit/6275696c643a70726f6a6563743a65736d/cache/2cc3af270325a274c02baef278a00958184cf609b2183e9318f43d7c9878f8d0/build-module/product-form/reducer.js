/**
 * External dependencies
 */
/**
 * Internal dependencies
 */
import TYPES from './action-types';
const reducer = (state = {
    errors: {},
    fields: [],
    sections: [],
    subsections: [],
    tabs: [],
}, action) => {
    switch (action.type) {
        case TYPES.GET_FIELDS_SUCCESS:
            state = {
                ...state,
                fields: action.fields,
            };
            break;
        case TYPES.GET_FIELDS_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    fields: action.error,
                },
            };
            break;
        case TYPES.GET_PRODUCT_FORM_SUCCESS:
            state = {
                ...state,
                fields: action.fields,
                sections: action.sections,
                subsections: action.subsections,
                tabs: action.tabs,
            };
            break;
        case TYPES.GET_PRODUCT_FORM_ERROR:
            state = {
                ...state,
                errors: {
                    ...state.errors,
                    fields: action.error,
                    sections: action.error,
                    subsections: action.error,
                },
            };
            break;
    }
    return state;
};
export default reducer;
