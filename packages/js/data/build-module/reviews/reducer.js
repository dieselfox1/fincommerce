/**
 * External dependencies
 */
/**
 * Internal dependencies
 */
import TYPES from './action-types';
const initialState = {
    reviews: {},
    errors: {},
    data: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.UPDATE_REVIEWS:
            const ids = [];
            const nextReviews = action.reviews.reduce((result, review) => {
                ids.push(review.id);
                result[review.id] = {
                    ...(state.data[review.id] || {}),
                    ...review,
                };
                return result;
            }, {});
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [JSON.stringify(action.query)]: {
                        data: ids,
                        totalCount: action.totalCount,
                    },
                },
                data: {
                    ...state.data,
                    ...nextReviews,
                },
            };
        case TYPES.SET_REVIEW:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.reviewId]: action.reviewData,
                },
            };
        case TYPES.SET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.query]: action.error,
                },
            };
        case TYPES.SET_REVIEW_IS_UPDATING:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.reviewId]: {
                        ...state.data[action.reviewId],
                        isUpdating: action.isUpdating,
                    },
                },
            };
        default:
            return state;
    }
};
export default reducer;
