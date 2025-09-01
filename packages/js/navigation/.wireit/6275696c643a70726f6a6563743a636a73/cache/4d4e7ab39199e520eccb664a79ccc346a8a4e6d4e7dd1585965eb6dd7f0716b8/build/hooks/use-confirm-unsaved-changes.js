"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConfirmUnsavedChanges = void 0;
/**
 * External dependencies
 */
const i18n_1 = require("@wordpress/i18n");
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const history_1 = require("../history");
const __1 = require("../");
const useConfirmUnsavedChanges = (hasUnsavedChanges, shouldConfirm, 
/**
 * This message is only shown when using history.push() to change the location;
 * when handling the onbeforeunload event (which happens when the user navigates
 * to a non-react router location, such as a non-WCA page),
 * the browser will show a generic message instead.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event#compatibility_notes
 */
message) => {
    const confirmMessage = (0, element_1.useMemo)(() => message ??
        (0, i18n_1.__)('Changes you made may not be saved.', 'fincommerce'), [message]);
    const history = (0, history_1.getHistory)();
    // This effect prevent react router from navigate and show
    // a confirmation message. It's a work around to beforeunload
    // because react router does not triggers that event.
    (0, element_1.useEffect)(() => {
        if (hasUnsavedChanges) {
            const push = history.push;
            history.push = (...args) => {
                const fromUrl = history.location;
                const toUrl = (0, __1.parseAdminUrl)(args[0]);
                if (typeof shouldConfirm === 'function' &&
                    !shouldConfirm(toUrl, fromUrl)) {
                    push(...args);
                    return;
                }
                /* eslint-disable-next-line no-alert */
                const result = window.confirm(confirmMessage);
                if (result !== false) {
                    push(...args);
                }
            };
            return () => {
                history.push = push;
            };
        }
    }, [history, hasUnsavedChanges, confirmMessage]);
    // This effect listens to the native beforeunload event to show
    // a confirmation message; note that the message shown is
    // a generic browser-specified string; not the custom one shown
    // when using react router.
    (0, element_1.useEffect)(() => {
        if (hasUnsavedChanges) {
            function onBeforeUnload(event) {
                event.preventDefault();
                return (event.returnValue = confirmMessage);
            }
            window.addEventListener('beforeunload', onBeforeUnload, {
                capture: true,
            });
            return () => {
                window.removeEventListener('beforeunload', onBeforeUnload, {
                    capture: true,
                });
            };
        }
    }, [hasUnsavedChanges, confirmMessage]);
};
exports.useConfirmUnsavedChanges = useConfirmUnsavedChanges;
