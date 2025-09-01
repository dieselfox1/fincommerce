"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersonalizationTagsList = getPersonalizationTagsList;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
const data_1 = require("@wordpress/data");
/**
 * Internal dependencies
 */
const actions_1 = require("./actions");
const constants_1 = require("./constants");
function* getPersonalizationTagsList() {
    // Access the state to check if already fetching
    const state = yield (0, data_1.select)(constants_1.storeName);
    const isAlreadyFetching = state.personalizationTags?.isFetching;
    // Exit if a fetch operation is already in progress
    if (isAlreadyFetching) {
        return;
    }
    // Mark as fetching
    yield (0, actions_1.setIsFetchingPersonalizationTags)(true);
    try {
        const data = yield (0, data_controls_1.apiFetch)({
            path: '/fincommerce-email-editor/v1/get_personalization_tags',
            method: 'GET',
        });
        yield (0, actions_1.setPersonalizationTagsList)(data.result);
    }
    finally {
        // Ensure fetching status is reset
        yield (0, actions_1.setIsFetchingPersonalizationTags)(false);
    }
}
