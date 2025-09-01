"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEventTrackingEnabled = exports.dispatcher = exports.EMAIL_STRING = exports.debouncedRecordEvent = exports.recordEventOnce = exports.recordEvent = void 0;
/**
 * External dependencies
 */
const lodash_1 = require("lodash");
const hooks_1 = require("@wordpress/hooks");
const isEventTrackingEnabled = () => {
    return (0, hooks_1.applyFilters)('fincommerce_email_editor_events_tracking_enabled', false);
};
exports.isEventTrackingEnabled = isEventTrackingEnabled;
const EMAIL_STRING = 'email_editor_events';
exports.EMAIL_STRING = EMAIL_STRING;
const dispatcher = new EventTarget();
exports.dispatcher = dispatcher;
/**
 * Record event tracking information
 *
 * @param {string} name - event name, in format `this_is_an_event`
 * @param          data - extra properties - please use a valid JSON object
 */
const recordEvent = (name, data = {}) => {
    if (!isEventTrackingEnabled()) {
        return;
    }
    const recordedData = typeof data !== 'object' ? { data } : data;
    const eventData = {
        name: `${EMAIL_STRING}_${name}`,
        ...recordedData,
    };
    dispatcher.dispatchEvent(new CustomEvent(EMAIL_STRING, { detail: eventData }));
};
exports.recordEvent = recordEvent;
/**
 * Generally used for when we want to ensure the event is tracked once
 * e.g., on page render or something similar
 * Takes the exact same parameter as `recordEvent`
 */
const recordEventOnce = (function () {
    const cachedEventName = {};
    return (name, data = {}) => {
        if (!isEventTrackingEnabled()) {
            return;
        }
        const cacheKey = `${name}_${JSON.stringify(data).length}`; // ensure each entry is unique by name and data
        if (cachedEventName[cacheKey]) {
            return; // do not execute again
        }
        recordEvent(name, data);
        cachedEventName[cacheKey] = true;
    };
})();
exports.recordEventOnce = recordEventOnce;
const debouncedRecordEvent = (0, lodash_1.debounce)(recordEvent, 700); // wait 700 milliseconds. The average human reaction speed time is around 250 ms, added some delay for mouse move and keyboard press
exports.debouncedRecordEvent = debouncedRecordEvent;
