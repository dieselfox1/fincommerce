export { bumpStat } from './stats';
export type ExtraProperties = {
    [key: string]: unknown;
};
/**
 * Record an event to Tracks
 *
 * @param {string} eventName       The name of the event to record, don't include the wcadmin_ prefix
 * @param {Object} eventProperties event properties to include in the event
 */
export declare function recordEvent(eventName: string, eventProperties?: ExtraProperties): false | undefined;
/**
 * Queue a tracks event.
 *
 * This allows you to delay tracks  events that would otherwise cause a race condition.
 * For example, when we trigger `wcadmin_tasklist_appearance_continue_setup` we're simultaneously moving the user to a new page via
 * `window.location`. This is an example of a race condition that should be avoided by enqueueing the event,
 * and therefore running it on the next pageview.
 *
 * @param {string} eventName       The name of the event to record, don't include the wcadmin_ prefix
 * @param {Object} eventProperties event properties to include in the event
 */
export declare function queueRecordEvent(eventName: string, eventProperties?: ExtraProperties): void;
/**
 * Record a page view to Tracks
 *
 * @param {string} path            the page/path to record a page view for
 * @param {Object} extraProperties extra event properties to include in the event
 */
export declare function recordPageView(path: string, extraProperties?: ExtraProperties): void;
//# sourceMappingURL=index.d.ts.map