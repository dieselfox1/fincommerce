"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setReviewIsUpdating = setReviewIsUpdating;
exports.setReview = setReview;
exports.setError = setError;
exports.updateReviews = updateReviews;
exports.updateReview = updateReview;
exports.deleteReview = deleteReview;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const url_1 = require("@wordpress/url");
/**
 * Internal dependencies
 */
const action_types_1 = __importDefault(require("./action-types"));
const constants_1 = require("../constants");
function setReviewIsUpdating(reviewId, isUpdating) {
    return {
        type: action_types_1.default.SET_REVIEW_IS_UPDATING,
        reviewId,
        isUpdating,
    };
}
function setReview(reviewId, reviewData) {
    return {
        type: action_types_1.default.SET_REVIEW,
        reviewId,
        reviewData,
    };
}
function setError(query, error) {
    return {
        type: action_types_1.default.SET_ERROR,
        query,
        error,
    };
}
function updateReviews(query, reviews, totalCount) {
    return {
        type: action_types_1.default.UPDATE_REVIEWS,
        reviews,
        query,
        totalCount,
    };
}
function* updateReview(reviewId, reviewFields, query) {
    yield setReviewIsUpdating(reviewId, true);
    try {
        const url = (0, url_1.addQueryArgs)(`${constants_1.NAMESPACE}/products/reviews/${reviewId}`, query || {});
        const review = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'PUT',
            data: reviewFields,
        });
        yield setReview(reviewId, review);
        yield setReviewIsUpdating(reviewId, false);
    }
    catch (error) {
        yield setError('updateReview', error);
        yield setReviewIsUpdating(reviewId, false);
        throw new Error();
    }
}
function* deleteReview(reviewId) {
    yield setReviewIsUpdating(reviewId, true);
    try {
        const url = `${constants_1.NAMESPACE}/products/reviews/${reviewId}`;
        const response = yield (0, data_controls_1.apiFetch)({
            path: url,
            method: 'DELETE',
        });
        yield setReview(reviewId, response);
        yield setReviewIsUpdating(reviewId, false);
        return response;
    }
    catch (error) {
        yield setError('deleteReview', error);
        yield setReviewIsUpdating(reviewId, false);
        throw new Error();
    }
}
