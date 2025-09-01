import { LogData, RemoteLoggerConfig } from './types';
export declare const REMOTE_LOGGING_SHOULD_SEND_ERROR_FILTER = "fincommerce_remote_logging_should_send_error";
export declare const REMOTE_LOGGING_ERROR_DATA_FILTER = "fincommerce_remote_logging_error_data";
export declare const REMOTE_LOGGING_LOG_ENDPOINT_FILTER = "fincommerce_remote_logging_log_endpoint";
export declare const REMOTE_LOGGING_JS_ERROR_ENDPOINT_FILTER = "fincommerce_remote_logging_js_error_endpoint";
export declare const REMOTE_LOGGING_REQUEST_URI_PARAMS_WHITELIST_FILTER = "fincommerce_remote_logging_request_uri_whitelist";
export declare const REMPOTE_LOGGING_REQUEST_URI_PARAMS_DEFAULT_WHITELIST: string[];
export declare const sanitiseRequestUriParams: (search: string) => string;
export declare class RemoteLogger {
    private config;
    private lastErrorSentTime;
    constructor(config: RemoteLoggerConfig);
    /**
     * Logs a message to Logstash.
     *
     * @param severity  - The severity of the log.
     * @param message   - The message to log.
     * @param extraData - Optional additional data to include in the log.
     */
    log(severity: Exclude<LogData['severity'], undefined>, message: string, extraData?: Partial<Exclude<LogData, 'message' | 'severity'>>): Promise<boolean>;
    /**
     * Logs an error to Logstash.
     *
     * @param  error     - The error to log.
     * @param  extraData - Optional additional data to include in the log.
     *
     * @return {Promise<void>} - A promise that resolves when the error is logged.
     */
    error(error: Error, extraData?: Partial<LogData>): Promise<void>;
    /**
     * Initializes error event listeners for catching unhandled errors and unhandled rejections.
     */
    initializeErrorHandlers(): void;
    /**
     * Sends a log entry to the remote API.
     *
     * @param logData - The log data to be sent.
     */
    private sendLog;
    /**
     * Handles an uncaught error and sends it to the remote API.
     *
     * @param error - The error to handle.
     */
    private handleError;
    /**
     * Sends an error to the remote API.
     *
     * @param error - The error data to be sent.
     */
    private sendError;
    /**
     * Limits the stack trace to 10 frames and formats it.
     *
     * @param stackTrace - The stack trace to format.
     * @return The formatted stack trace.
     */
    private getFormattedStackFrame;
    /**
     * Formats a single stack frame.
     *
     * @param frame - The stack frame to format.
     * @param index - The index of the frame in the stack.
     * @return The formatted stack frame.
     */
    private getFormattedFrame;
    /**
     * Determines whether an error should be handled.
     *
     * @param error       - The error to check.
     * @param stackFrames - The stack frames of the error.
     * @return Whether the error should be handled.
     */
    private shouldHandleError;
    private isRateLimited;
}
/**
 * Initializes the remote logging and error handlers.
 * This function should be called once at the start of the application.
 *
 * @param config - Configuration object for the RemoteLogger.
 *
 */
export declare function init(config: RemoteLoggerConfig): void;
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
export declare function log(severity: Exclude<LogData['severity'], undefined>, message: string, extraData?: Partial<Exclude<LogData, 'message' | 'severity'>>): Promise<boolean>;
/**
 * Captures an error and sends it to the remote API. Respects the error rate limit.
 *
 * @param error     - The error to capture.
 * @param extraData - Optional additional data to include in the log.
 */
export declare function captureException(error: Error, extraData?: Partial<LogData>): Promise<false | undefined>;
//# sourceMappingURL=remote-logger.d.ts.map