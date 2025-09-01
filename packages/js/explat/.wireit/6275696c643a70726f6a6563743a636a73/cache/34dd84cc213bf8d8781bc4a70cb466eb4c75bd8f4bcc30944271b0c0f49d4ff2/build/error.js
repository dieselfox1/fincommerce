"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = void 0;
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const logError = (error) => {
    const onLoggingError = (e) => {
        if (utils_1.isDevelopmentMode) {
            console.error('[ExPlat] Unable to send error to server:', e); // eslint-disable-line no-console
        }
    };
    try {
        const { message, ...properties } = error;
        const logStashError = {
            message,
            properties: {
                ...properties,
                context: 'explat',
                explat_client: 'fincommerce',
            },
        };
        if (utils_1.isDevelopmentMode) {
            console.error('[ExPlat] ', error.message, error); // eslint-disable-line no-console
        }
        else {
            if (!window.wcTracks?.isEnabled && !window?._wca?.push) {
                throw new Error(`Tracking is disabled, can't send error to the server`);
            }
            const body = new window.FormData();
            body.append('error', JSON.stringify(logStashError));
            window
                .fetch('https://public-api.wordpress.com/rest/v1.1/js-error', {
                method: 'POST',
                body,
            })
                .catch(onLoggingError);
        }
    }
    catch (e) {
        onLoggingError(e);
    }
};
exports.logError = logError;
