"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setReportItemsError = setReportItemsError;
exports.setReportItems = setReportItems;
exports.setReportStats = setReportStats;
exports.setReportStatsError = setReportStatsError;
/**
 * Internal dependencies
 */
const utils_1 = require("../utils");
const action_types_1 = __importDefault(require("./action-types"));
function setReportItemsError(endpoint, query, error) {
    const resourceName = (0, utils_1.getResourceName)(endpoint, query);
    return {
        type: action_types_1.default.SET_ITEM_ERROR,
        resourceName,
        error,
    };
}
function setReportItems(endpoint, query, items) {
    const resourceName = (0, utils_1.getResourceName)(endpoint, query);
    return {
        type: action_types_1.default.SET_REPORT_ITEMS,
        resourceName,
        items,
    };
}
function setReportStats(endpoint, query, stats) {
    const resourceName = (0, utils_1.getResourceName)(endpoint, query);
    return {
        type: action_types_1.default.SET_REPORT_STATS,
        resourceName,
        stats,
    };
}
function setReportStatsError(endpoint, query, error) {
    const resourceName = (0, utils_1.getResourceName)(endpoint, query);
    return {
        type: action_types_1.default.SET_STAT_ERROR,
        resourceName,
        error,
    };
}
