"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRemoveSavingFailedNotices = void 0;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
const data_1 = require("@wordpress/data");
const i18n_1 = require("@wordpress/i18n");
const notices_1 = require("@wordpress/notices");
/**
 * Remove error notice that could be confusing for users. This error is thrown when we reject saving in the validation middleware.
 * For example: Saving failed. Error: Content validation failed.
 */
const useRemoveSavingFailedNotices = () => {
    // Create a regular expression that escapes special characters and matches the beginning of the string
    const savingFailedRegex = (0, element_1.useMemo)(() => {
        // Get the translated "Saving failed" message once
        // eslint-disable-next-line @wordpress/i18n-text-domain -- We want to match WordPress translation here.
        const savingFailedMessage = (0, i18n_1.__)('Saving failed.');
        return new RegExp('^' + savingFailedMessage.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    }, []);
    (0, element_1.useEffect)(() => {
        const unsubscribe = (0, data_1.subscribe)(() => {
            (0, data_1.select)(notices_1.store)
                .getNotices()
                .forEach((notice) => {
                if (typeof notice.content === 'string' &&
                    savingFailedRegex.test(notice.content)) {
                    (0, data_1.dispatch)(notices_1.store).removeNotice(notice.id);
                }
            });
        });
        return () => {
            unsubscribe(); // Clean up subscription
        };
    }, [savingFailedRegex]);
};
exports.useRemoveSavingFailedNotices = useRemoveSavingFailedNotices;
