"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REMOTE_LOGGING_JS_ERROR_ENDPOINT_FILTER = exports.REMOTE_LOGGING_LOG_ENDPOINT_FILTER = exports.REMOTE_LOGGING_ERROR_DATA_FILTER = exports.REMOTE_LOGGING_SHOULD_SEND_ERROR_FILTER = exports.captureException = exports.log = exports.init = void 0;
var remote_logger_1 = require("./remote-logger");
Object.defineProperty(exports, "init", { enumerable: true, get: function () { return remote_logger_1.init; } });
Object.defineProperty(exports, "log", { enumerable: true, get: function () { return remote_logger_1.log; } });
Object.defineProperty(exports, "captureException", { enumerable: true, get: function () { return remote_logger_1.captureException; } });
Object.defineProperty(exports, "REMOTE_LOGGING_SHOULD_SEND_ERROR_FILTER", { enumerable: true, get: function () { return remote_logger_1.REMOTE_LOGGING_SHOULD_SEND_ERROR_FILTER; } });
Object.defineProperty(exports, "REMOTE_LOGGING_ERROR_DATA_FILTER", { enumerable: true, get: function () { return remote_logger_1.REMOTE_LOGGING_ERROR_DATA_FILTER; } });
Object.defineProperty(exports, "REMOTE_LOGGING_LOG_ENDPOINT_FILTER", { enumerable: true, get: function () { return remote_logger_1.REMOTE_LOGGING_LOG_ENDPOINT_FILTER; } });
Object.defineProperty(exports, "REMOTE_LOGGING_JS_ERROR_ENDPOINT_FILTER", { enumerable: true, get: function () { return remote_logger_1.REMOTE_LOGGING_JS_ERROR_ENDPOINT_FILTER; } });
__exportStar(require("./types"), exports);
