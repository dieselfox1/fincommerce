"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initStoreTracking = void 0;
/**
 * External dependencies
 */
const data_1 = require("@wordpress/data");
const preferences_1 = require("@wordpress/preferences");
const editor_1 = require("@wordpress/editor");
const i18n_1 = require("@wordpress/i18n");
/**
 * Internal dependencies
 */
const _1 = require(".");
/**
 * Handler functions for tracking individual events recorder by the listening to store actions.
 */
const trackSetDeviceType = (deviceType) => {
    (0, _1.recordEvent)(`header_preview_dropdown_${deviceType.toLowerCase()}_selected`);
};
const trackSetPreference = (scope, name, value) => {
    const valueBeforeToggle = (0, data_1.select)(preferences_1.store).get(scope, name);
    if (valueBeforeToggle === value) {
        return;
    }
    const trackedPreferences = {
        focusMode: 'focus_mode_toggle',
        fullscreenMode: 'full_screen_mode_toggle',
        distractionFree: 'distraction_free_toggle',
        fixedToolbar: 'fixed_toolbar_toggle',
    };
    if (trackedPreferences[name]) {
        (0, _1.recordEvent)(trackedPreferences[name], { isEnabled: value });
    }
};
const trackBlockAndPatternInsertion = (...args) => {
    // @ts-expect-error - isInserterOpened is not in editor types
    const inserterPanelOpened = (0, data_1.select)(editor_1.store).isInserterOpened();
    const insQuickInsertOpened = !!document.getElementsByClassName('block-editor-inserter__quick-inserter').length;
    // We are a bit guessing here that user uses inserter panel when it is opened
    let source = 'other_inserter';
    if (inserterPanelOpened) {
        source = 'inserter_sidebar';
    }
    else if (insQuickInsertOpened) {
        source = 'quick_inserter';
    }
    const blockData = args[0];
    const meta = args[5];
    // Single block insertion
    if (Array.isArray(blockData) === false &&
        typeof blockData === 'object') {
        (0, _1.recordEvent)(`${source}_library_block_selected`, {
            blockName: blockData.name,
        });
    }
    // Patter inserted
    if (Array.isArray(blockData) && meta && meta.patternName) {
        (0, _1.recordEvent)(`${source}_library_pattern_selected`, {
            patternName: meta.patternName,
        });
    }
};
const trackSetRenderingMode = (renderingMode) => {
    // @ts-expect-error - getRenderingMode is not in editor types
    const currentRenderingMode = (0, data_1.select)(editor_1.store).getRenderingMode();
    if (currentRenderingMode === renderingMode) {
        return;
    }
    const isPreviewDropdownOpened = !!document.querySelector(
    // eslint-disable-next-line @wordpress/i18n-text-domain
    `[aria-label="${(0, i18n_1.__)('View options')}"]`);
    // We want to track the event only from the dropdown.
    // The mode might also change when switching between an email content and template.
    if (isPreviewDropdownOpened) {
        (0, _1.recordEvent)('preview_dropdown_rendering_mode_changed', {
            renderingMode,
        });
    }
};
/**
 * List of store actions to be tracked.
 */
const TRACKED_STORE_EVENTS = {
    'core/editor': {
        autosave: 'editor_content_auto_saved',
        setDeviceType: trackSetDeviceType,
        setRenderingMode: trackSetRenderingMode,
    },
    'core/block-editor': {
        insertBlock: trackBlockAndPatternInsertion,
        insertBlocks: trackBlockAndPatternInsertion,
    },
    'core/preferences': {
        set: trackSetPreference,
    },
    'core/commands': {
        open: 'command_menu_opened',
        close: 'command_menu_closed',
    },
};
const rewrittenActions = {};
const originalActions = {};
const initStoreTracking = () => {
    if (!(0, _1.isEventTrackingEnabled)()) {
        return;
    }
    (0, data_1.use)((registry) => ({
        dispatch: (namespace) => {
            const storeName = typeof namespace === 'object' ? namespace.name : namespace;
            const actions = registry.dispatch(storeName);
            const trackers = TRACKED_STORE_EVENTS[storeName];
            if (!trackers) {
                return actions;
            }
            // Initialize namespace level objects if not yet done.
            if (!rewrittenActions[storeName]) {
                rewrittenActions[storeName] = {};
            }
            if (!originalActions[storeName]) {
                originalActions[storeName] = {};
            }
            for (const [action, event] of Object.entries(trackers)) {
                if (!originalActions[storeName][action]) {
                    originalActions[storeName][action] = actions[action];
                    rewrittenActions[storeName][action] = (...args) => {
                        try {
                            if (typeof event === 'function') {
                                event(...args);
                            }
                            else if (typeof event === 'string') {
                                (0, _1.recordEvent)(event);
                            }
                        }
                        catch (error) {
                            // eslint-disable-next-line no-console
                            console.error('Error tracking event', error);
                        }
                        return originalActions[storeName][action](...args);
                    };
                }
                actions[action] = rewrittenActions[storeName][action];
            }
            return actions;
        },
    }));
};
exports.initStoreTracking = initStoreTracking;
