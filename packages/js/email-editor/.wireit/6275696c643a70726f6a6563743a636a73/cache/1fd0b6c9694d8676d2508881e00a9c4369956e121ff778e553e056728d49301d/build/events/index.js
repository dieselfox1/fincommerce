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
exports.isEventTrackingEnabled = exports.debouncedRecordEvent = exports.recordEventOnce = exports.recordEvent = void 0;
var event_pipeline_1 = require("./event-pipeline");
Object.defineProperty(exports, "recordEvent", { enumerable: true, get: function () { return event_pipeline_1.recordEvent; } });
Object.defineProperty(exports, "recordEventOnce", { enumerable: true, get: function () { return event_pipeline_1.recordEventOnce; } });
Object.defineProperty(exports, "debouncedRecordEvent", { enumerable: true, get: function () { return event_pipeline_1.debouncedRecordEvent; } });
Object.defineProperty(exports, "isEventTrackingEnabled", { enumerable: true, get: function () { return event_pipeline_1.isEventTrackingEnabled; } });
__exportStar(require("./event-collector"), exports);
__exportStar(require("./store-tracking"), exports);
__exportStar(require("./dom-tracking"), exports);
