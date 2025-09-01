/**
 * Internal dependencies
 */
import TYPES from './action-types';
const reducer = (state = {
    fields: {},
}, payload) => {
    if (payload && 'type' in payload) {
        switch (payload.type) {
            case TYPES.REGISTER_FIELD:
                return {
                    ...state,
                    fields: {
                        ...state.fields,
                        [payload.field.name]: payload.field,
                    },
                };
            default:
                return state;
        }
    }
    return state;
};
export default reducer;
