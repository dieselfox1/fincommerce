declare const isEventTrackingEnabled: () => boolean;
declare const EMAIL_STRING = "email_editor_events";
declare const dispatcher: EventTarget;
/**
 * Record event tracking information
 *
 * @param {string} name - event name, in format `this_is_an_event`
 * @param          data - extra properties - please use a valid JSON object
 */
declare const recordEvent: (name: string, data?: {}) => void;
/**
 * Generally used for when we want to ensure the event is tracked once
 * e.g., on page render or something similar
 * Takes the exact same parameter as `recordEvent`
 */
declare const recordEventOnce: (name: string, data?: {}) => void;
declare const debouncedRecordEvent: import("lodash").DebouncedFunc<(name: string, data?: {}) => void>;
export { recordEvent, recordEventOnce, debouncedRecordEvent, EMAIL_STRING, dispatcher, isEventTrackingEnabled, };
