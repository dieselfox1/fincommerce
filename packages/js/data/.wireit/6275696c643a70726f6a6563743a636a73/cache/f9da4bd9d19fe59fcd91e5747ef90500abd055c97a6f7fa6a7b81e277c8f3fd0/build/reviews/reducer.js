"use strict";
/**
 * External dependencies
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const initialState = {
    reviews: {},
    errors: {},
    data: {},
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case action_types_1.default.UPDATE_REVIEWS:
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
        case action_types_1.default.SET_REVIEW:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.reviewId]: action.reviewData,
                },
            };
        case action_types_1.default.SET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.query]: action.error,
                },
            };
        case action_types_1.default.SET_REVIEW_IS_UPDATING:
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
exports.default = reducer;
