"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bumpStat = bumpStat;
/**
 * External dependencies
 */
const debug_1 = __importDefault(require("debug"));
/**
 * Internal dependencies
 */
const utils_1 = require("./utils");
/**
 * Module variables
 */
const tracksDebug = (0, debug_1.default)('wc-admin:tracks:stats');
const GROUP_PREFIX = 'x_fincommerce-';
/**
 * Builds a query parameters from the given group and name parameters.
 *
 * This will automatically add the prefix `x_fincommerce-` to the group name.
 *
 * @param {Record<string, string> | string} group  - The group of stats or a single stat name.
 * @param {string}                          [name] - The name of the stat if group is a string.
 *
 * @return {URLSearchParams} The constructed query.
 */
function buildQueryParams(group, name) {
    const params = new URLSearchParams();
    params.append('v', 'wpcom-no-pv');
    if (typeof group !== 'object') {
        params.append(`${GROUP_PREFIX}${group}`, name);
    }
    else {
        Object.entries(group).forEach(([key, value]) => {
            params.append(`${GROUP_PREFIX}${key}`, value);
        });
    }
    // Add a random number to the query string to avoid caching.
    params.append('t', Math.random().toString());
    return params;
}
/**
 * Bumps a stat or group of stats.
 *
 * @param {Record<string, string> | string} group  - The group of stats or a single stat name.
 * @param {string}                          [name] - The name of the stat if group is a string.
 * @return {boolean} True if the stat was successfully bumped, false otherwise.
 */
function bumpStat(group, name = '') {
    if (typeof group === 'object') {
        tracksDebug('Bumping stats %o', group);
    }
    else {
        tracksDebug('Bumping stat %s:%s', group, name);
        if (!name) {
            tracksDebug('No stat name provided for group %s', group);
            return false;
        }
    }
    const shouldBumpStat = !utils_1.isDevelopmentMode &&
        !!window.wcTracks &&
        !!window.wcTracks.isEnabled;
    if (!shouldBumpStat) {
        return false;
    }
    const params = buildQueryParams(group, name);
    new window.Image().src = `${document.location.protocol}//pixel.wp.com/g.gif?${params.toString()}`;
    return true;
}
