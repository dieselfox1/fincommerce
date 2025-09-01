"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEventCollector = void 0;
/**
 * External dependencies
 */
const hooks_1 = require("@wordpress/hooks");
/**
 * Internal dependencies
 */
const event_pipeline_1 = require("./event-pipeline");
const eventListenerHandler = (eventData) => {
    (0, hooks_1.doAction)('fincommerce_email_editor_events', eventData.detail);
};
const initEventCollector = () => {
    if (!(0, event_pipeline_1.isEventTrackingEnabled)()) {
        return;
    }
    event_pipeline_1.dispatcher.addEventListener(event_pipeline_1.EMAIL_STRING, eventListenerHandler);
};
exports.initEventCollector = initEventCollector;
window.addEventListener('unload', function () {
    if (!(0, event_pipeline_1.isEventTrackingEnabled)()) {
        return;
    }
    event_pipeline_1.dispatcher.removeEventListener(event_pipeline_1.EMAIL_STRING, eventListenerHandler);
});
