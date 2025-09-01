"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewError = exports.getReviewsError = exports.getReviewsTotalCount = exports.getReview = exports.getReviews = void 0;
const getReviews = (state, query) => {
    const stringifiedQuery = JSON.stringify(query);
    const ids = (state.reviews[stringifiedQuery] &&
        state.reviews[stringifiedQuery].data) ||
        [];
    return ids.map((id) => state.data[id]);
};
exports.getReviews = getReviews;
const getReview = (state, id) => {
    return state.data[id];
};
exports.getReview = getReview;
const getReviewsTotalCount = (state, query) => {
    const stringifiedQuery = JSON.stringify(query);
    return (state.reviews[stringifiedQuery] &&
        state.reviews[stringifiedQuery].totalCount);
};
exports.getReviewsTotalCount = getReviewsTotalCount;
const getReviewsError = (state, query) => {
    const stringifiedQuery = JSON.stringify(query);
    return state.errors[stringifiedQuery];
};
exports.getReviewsError = getReviewsError;
const getReviewError = (state, id) => {
    return state.errors[id];
};
exports.getReviewError = getReviewError;
