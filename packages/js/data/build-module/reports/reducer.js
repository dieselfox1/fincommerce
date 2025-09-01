/**
 * Internal dependencies
 */
import TYPES from './action-types';
const initialState = {
    itemErrors: {},
    items: {},
    statErrors: {},
    stats: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_REPORT_ITEMS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.resourceName]: action.items,
                },
            };
        case TYPES.SET_REPORT_STATS:
            return {
                ...state,
                stats: {
                    ...state.stats,
                    [action.resourceName]: action.stats,
                },
            };
        case TYPES.SET_ITEM_ERROR:
            return {
                ...state,
                itemErrors: {
                    ...state.itemErrors,
                    [action.resourceName]: action.error,
                },
            };
        case TYPES.SET_STAT_ERROR:
            return {
                ...state,
                statErrors: {
                    ...state.statErrors,
                    [action.resourceName]: action.error,
                },
            };
        default:
            return state;
    }
};
export default reducer;
