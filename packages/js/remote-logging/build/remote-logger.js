"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteLogger = exports.sanitiseRequestUriParams = exports.REMPOTE_LOGGING_REQUEST_URI_PARAMS_DEFAULT_WHITELIST = exports.REMOTE_LOGGING_REQUEST_URI_PARAMS_WHITELIST_FILTER = exports.REMOTE_LOGGING_JS_ERROR_ENDPOINT_FILTER = exports.REMOTE_LOGGING_LOG_ENDPOINT_FILTER = exports.REMOTE_LOGGING_ERROR_DATA_FILTER = exports.REMOTE_LOGGING_SHOULD_SEND_ERROR_FILTER = void 0;
exports.init = init;
exports.log = log;
exports.captureException = captureException;
/**
 * External dependencies
 */
const debug_1 = __importDefault(require("debug"));
const settings_1 = require("@fincommerce/settings");
const tracekit_1 = __importDefault(require("tracekit"));
const hooks_1 = require("@wordpress/hooks");
const tracks_1 = require("@fincommerce/tracks");
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
const debug = (0, debug_1.default)('wc:remote-logging');
const warnLog = (message) => {
    // eslint-disable-next-line no-console
    console.warn('RemoteLogger: ' + message);
};
const errorLog = (message, ...args) => {
    // eslint-disable-next-line no-console
    console.error('RemoteLogger: ' + message, ...args);
};
exports.REMOTE_LOGGING_SHOULD_SEND_ERROR_FILTER = 'fincommerce_remote_logging_should_send_error';
exports.REMOTE_LOGGING_ERROR_DATA_FILTER = 'fincommerce_remote_logging_error_data';
exports.REMOTE_LOGGING_LOG_ENDPOINT_FILTER = 'fincommerce_remote_logging_log_endpoint';
exports.REMOTE_LOGGING_JS_ERROR_ENDPOINT_FILTER = 'fincommerce_remote_logging_js_error_endpoint';
exports.REMOTE_LOGGING_REQUEST_URI_PARAMS_WHITELIST_FILTER = 'fincommerce_remote_logging_request_uri_whitelist';
exports.REMPOTE_LOGGING_REQUEST_URI_PARAMS_DEFAULT_WHITELIST = [
    'path',
    'page',
    'step',
    'task',
    'tab',
    'section',
    'status',
    'post_type',
    'taxonomy',
    'action',
];
const sanitiseRequestUriParams = (search) => {
    const params = new URLSearchParams(search);
    /**
     * This filter modifies the list of whitelisted query parameters that won't be masked
     * in the logged request URI
     *
     * @filter fincommerce_remote_logging_request_uri_whitelist
     * @param {string[]} whitelist The default whitelist
     */
    const whitelist = (0, hooks_1.applyFilters)(exports.REMOTE_LOGGING_REQUEST_URI_PARAMS_WHITELIST_FILTER, exports.REMPOTE_LOGGING_REQUEST_URI_PARAMS_DEFAULT_WHITELIST);
    for (const [key] of params) {
        if (!whitelist.includes(key)) {
            params.set(key, 'xxxxxx');
        }
    }
    return params.toString();
};
exports.sanitiseRequestUriParams = sanitiseRequestUriParams;
const REMOTE_LOGGING_LAST_ERROR_SENT_KEY = 'wc_remote_logging_last_error_sent_time';
const DEFAULT_LOG_DATA = {
    message: '',
    feature: 'fincommerce_core',
    host: window.location.hostname,
    tags: ['fincommerce', 'js'],
    properties: {
        wp_version: (0, settings_1.getSetting)('wpVersion'),
        wc_version: (0, settings_1.getSetting)('wcVersion'),
    },
};
class RemoteLogger {
    config;
    lastErrorSentTime = 0;
    constructor(config) {
        this.config = config;
        this.lastErrorSentTime = parseInt(localStorage.getItem(REMOTE_LOGGING_LAST_ERROR_SENT_KEY) || '0', 10);
    }
    /**
     * Logs a message to Logstash.
     *
     * @param severity  - The severity of the log.
     * @param message   - The message to log.
     * @param extraData - Optional additional data to include in the log.
     */
    async log(severity, message, extraData) {
        if (!message) {
            debug('Empty message');
            return false;
        }
        const logData = (0, utils_1.mergeLogData)(DEFAULT_LOG_DATA, {
            message,
            severity,
            ...extraData,
        });
        debug('Logging:', logData);
        return await this.sendLog(logData);
    }
    /**
     * Logs an error to Logstash.
     *
     * @param  error     - The error to log.
     * @param  extraData - Optional additional data to include in the log.
     *
     * @return {Promise<void>} - A promise that resolves when the error is logged.
     */
    async error(error, extraData) {
        if (this.isRateLimited()) {
            return;
        }
        const errorData = {
            ...(0, utils_1.mergeLogData)(DEFAULT_LOG_DATA, {
                message: error.message,
                severity: 'error',
                ...extraData,
                properties: {
                    ...extraData?.properties,
                    request_uri: window.location.pathname +
                        (0, exports.sanitiseRequestUriParams)(window.location.search),
                },
            }),
            trace: this.getFormattedStackFrame(tracekit_1.default.computeStackTrace(error)),
        };
        debug('Logging error:', errorData);
        await this.sendError(errorData);
    }
    /**
     * Initializes error event listeners for catching unhandled errors and unhandled rejections.
     */
    initializeErrorHandlers() {
        window.addEventListener('error', (event) => {
            debug('Caught error event:', event);
            this.handleError(event.error).catch((error) => {
                debug('Failed to handle error:', error);
            });
        });
        window.addEventListener('unhandledrejection', async (event) => {
            debug('Caught unhandled rejection:', event);
            try {
                const error = typeof event.reason === 'string'
                    ? new Error(event.reason)
                    : event.reason;
                await this.handleError(error);
            }
            catch (error) {
                debug('Failed to handle unhandled rejection:', error);
            }
        });
    }
    /**
     * Sends a log entry to the remote API.
     *
     * @param logData - The log data to be sent.
     */
    async sendLog(logData) {
        if (utils_1.isDevelopmentEnvironment) {
            debug('Skipping send log in development environment');
            return false;
        }
        const body = new window.FormData();
        body.append('params', JSON.stringify(logData));
        try {
            debug('Sending log to API:', logData);
            /**
             * Filters the Log API endpoint URL.
             *
             * @param {string} endpoint The default Log API endpoint URL.
             */
            const endpoint = (0, hooks_1.applyFilters)(exports.REMOTE_LOGGING_LOG_ENDPOINT_FILTER, 'https://public-api.wordpress.com/rest/v1.1/logstash');
            const response = await window.fetch(endpoint, {
                method: 'POST',
                body,
            });
            if (!response.ok) {
                throw new Error(`response body: ${response.body}`);
            }
            return true;
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error('Failed to send log to API:', error);
            return false;
        }
    }
    /**
     * Handles an uncaught error and sends it to the remote API.
     *
     * @param error - The error to handle.
     */
    async handleError(error) {
        const trace = tracekit_1.default.computeStackTrace(error);
        if (!this.shouldHandleError(error, trace.stack)) {
            debug('Irrelevant error. Skipping handling.', error);
            return;
        }
        // Bump the stat for unhandled JS errors to track the frequency of these errors.
        (0, tracks_1.bumpStat)('error', 'unhandled-js-errors');
        if (this.isRateLimited()) {
            return;
        }
        const errorData = {
            ...(0, utils_1.mergeLogData)(DEFAULT_LOG_DATA, {
                message: error.message,
                severity: 'critical',
                tags: ['js-unhandled-error'],
                properties: {
                    request_uri: window.location.pathname +
                        (0, exports.sanitiseRequestUriParams)(window.location.search),
                },
            }),
            trace: this.getFormattedStackFrame(trace),
        };
        /**
         * This filter allows to modify the error data before sending it to the remote API.
         *
         * @filter fincommerce_remote_logging_error_data
         * @param {ErrorData} errorData The error data to be sent.
         */
        const filteredErrorData = (0, hooks_1.applyFilters)(exports.REMOTE_LOGGING_ERROR_DATA_FILTER, errorData);
        try {
            await this.sendError(filteredErrorData);
        }
        catch (_error) {
            // eslint-disable-next-line no-console
            console.error('Failed to send error:', _error);
        }
    }
    /**
     * Sends an error to the remote API.
     *
     * @param error - The error data to be sent.
     */
    async sendError(error) {
        if (utils_1.isDevelopmentEnvironment) {
            debug('Skipping send error in development environment');
            return;
        }
        const body = new window.FormData();
        body.append('error', JSON.stringify(error));
        try {
            /**
             * Filters the JS error endpoint URL.
             *
             * @param {string} endpoint The default JS error endpoint URL.
             */
            const endpoint = (0, hooks_1.applyFilters)(exports.REMOTE_LOGGING_JS_ERROR_ENDPOINT_FILTER, 'https://public-api.wordpress.com/rest/v1.1/js-error');
            debug('Sending error to API:', error);
            await window.fetch(endpoint, {
                method: 'POST',
                body,
            });
        }
        catch (_error) {
            // eslint-disable-next-line no-console
            console.error('Failed to send error to API:', _error);
        }
        finally {
            this.lastErrorSentTime = Date.now();
            localStorage.setItem(REMOTE_LOGGING_LAST_ERROR_SENT_KEY, this.lastErrorSentTime.toString());
        }
    }
    /**
     * Limits the stack trace to 10 frames and formats it.
     *
     * @param stackTrace - The stack trace to format.
     * @return The formatted stack trace.
     */
    getFormattedStackFrame(stackTrace) {
        const trace = stackTrace.stack
            .slice(0, 10)
            .map(this.getFormattedFrame)
            .join('\n\n');
        // Set hard limit of 8192 characters for the stack trace so it does not use too much user bandwidth and also our computation.
        return trace.length > 8192 ? trace.substring(0, 8192) : trace;
    }
    /**
     * Formats a single stack frame.
     *
     * @param frame - The stack frame to format.
     * @param index - The index of the frame in the stack.
     * @return The formatted stack frame.
     */
    getFormattedFrame(frame, index) {
        // Format the function name
        const funcName = frame.func !== '?' ? frame.func.replace(/"/g, '') : 'anonymous';
        // Format the URL
        const url = frame.url.replace(/"/g, '');
        // Format the context. Limit to 256 characters.
        const context = frame.context
            ? frame.context
                .map((line) => line.replace(/^"|"$/g, '').replace(/\\"/g, '"'))
                .filter((line) => line.trim() !== '')
                .join('\n    ')
                .substring(0, 256)
            : '';
        // Construct the formatted string
        return (`#${index + 1} at ${funcName} (${url}:${frame.line}:${frame.column})` + (context ? `\n${context}` : ''));
    }
    /**
     * Determines whether an error should be handled.
     *
     * @param error       - The error to check.
     * @param stackFrames - The stack frames of the error.
     * @return Whether the error should be handled.
     */
    shouldHandleError(error, stackFrames) {
        const containsfincommerceFrame = stackFrames.some((frame) => frame.url && frame.url.startsWith((0, settings_1.getSetting)('wcAssetUrl')));
        /**
         * This filter allows to control whether an error should be sent to the remote API.
         *
         * @filter fincommerce_remote_logging_should_send_error
         * @param {boolean}               shouldSendError Whether the error should be sent.
         * @param {Error}                 error           The error object.
         * @param {TraceKit.StackFrame[]} stackFrames     The stack frames of the error.
         *
         */
        return (0, hooks_1.applyFilters)(exports.REMOTE_LOGGING_SHOULD_SEND_ERROR_FILTER, containsfincommerceFrame, error, stackFrames);
    }
    isRateLimited() {
        const currentTime = Date.now();
        if (currentTime - this.lastErrorSentTime <
            this.config.errorRateLimitMs) {
            debug('Rate limit reached. Skipping send error');
            return true;
        }
        return false;
    }
}
exports.RemoteLogger = RemoteLogger;
let logger = null;
/**
 * Checks if remote logging is enabled and if the logger is initialized.
 *
 * @return {boolean} - Returns true if remote logging is enabled and the logger is initialized, otherwise false.
 */
function canLog(_logger) {
    if (!window.wcSettings?.isRemoteLoggingEnabled) {
        debug('Remote logging is disabled.');
        return false;
    }
    if (!_logger) {
        warnLog('RemoteLogger is not initialized. Call init() first.');
        return false;
    }
    return true;
}
/**
 * Initializes the remote logging and error handlers.
 * This function should be called once at the start of the application.
 *
 * @param config - Configuration object for the RemoteLogger.
 *
 */
function init(config) {
    if (!window.wcSettings?.isRemoteLoggingEnabled) {
        debug('Remote logging is disabled.');
        return;
    }
    if (logger) {
        warnLog('RemoteLogger is already initialized.');
        return;
    }
    try {
        logger = new RemoteLogger(config);
        logger.initializeErrorHandlers();
        debug('RemoteLogger initialized.');
    }
    catch (error) {
        errorLog('Failed to initialize RemoteLogger:', error);
    }
}
/**
 * Logs a message or error.
 *
 * This function is inefficient because the data goes over the REST API, so use sparingly.
 *
 * @param severity  - The severity of the log.
 * @param message   - The message to log.
 * @param extraData - Optional additional data to include in the log.
 *
 */
async function log(severity, message, extraData) {
    if (!canLog(logger)) {
        return false;
    }
    try {
        return await logger.log(severity, message, extraData);
    }
    catch (error) {
        errorLog('Failed to send log:', error);
        return false;
    }
}
/**
 * Captures an error and sends it to the remote API. Respects the error rate limit.
 *
 * @param error     - The error to capture.
 * @param extraData - Optional additional data to include in the log.
 */
async function captureException(error, extraData) {
    if (!canLog(logger)) {
        return false;
    }
    try {
        await logger.error(error, extraData);
    }
    catch (_error) {
        errorLog('Failed to send log:', _error);
    }
}
