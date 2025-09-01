"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCesSurveyQueue = getCesSurveyQueue;
/**
 * External dependencies
 */
const data_controls_1 = require("@wordpress/data-controls");
/**
 * Internal dependencies
 */
const actions_1 = require("./actions");
const constants_1 = require("./constants");
function* getCesSurveyQueue() {
    const response = yield (0, data_controls_1.apiFetch)({
        path: `${constants_1.API_NAMESPACE}/options?options=${constants_1.QUEUE_OPTION_NAME}`,
    });
    if (response) {
        yield (0, actions_1.setCesSurveyQueue)(response[constants_1.QUEUE_OPTION_NAME] || []);
    }
    else {
        throw new Error();
    }
}
