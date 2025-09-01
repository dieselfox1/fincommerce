"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = getReviews;
exports.getReview = getReview;
exports.getReviewsTotalCount = getReviewsTotalCount;
/**
 * External dependencies
 */
const url_1 = require("@wordpress/url");
/**
 * Internal dependencies
 */
const constants_1 = require("../constants");
const actions_1 = require("./actions");
const controls_1 = require("../controls");
function* getReviews(query) {
    try {
        const url = (0, url_1.addQueryArgs)(`${constants_1.NAMESPACE}/products/reviews`, query);
        const response = yield (0, controls_1.fetchWithHeaders)({
            path: url,
            method: 'GET',
        });
        const totalCountFromHeader = response.headers.get('x-wp-total');
        if (totalCountFromHeader === undefined) {
            throw new Error("Malformed response from server. 'x-wp-total' header is missing when retrieving ./products/reviews.");
        }
        const totalCount = parseInt(totalCountFromHeader, 10);
        yield (0, actions_1.updateReviews)(query, response.data, totalCount);
    }
    catch (error) {
        yield (0, actions_1.setError)(JSON.stringify(query), error);
    }
}
function* getReview(id) {
    try {
        const url = (0, url_1.addQueryArgs)(`wc/v3/products/reviews/${id}`);
        const response = yield (0, controls_1.fetchWithHeaders)({
            path: url,
            method: 'GET',
        });
        yield (0, actions_1.setReview)(id, response.data);
    }
    catch (error) {
        yield (0, actions_1.setError)(JSON.stringify(id), error);
    }
}
function* getReviewsTotalCount(query) {
    yield getReviews(query);
}
