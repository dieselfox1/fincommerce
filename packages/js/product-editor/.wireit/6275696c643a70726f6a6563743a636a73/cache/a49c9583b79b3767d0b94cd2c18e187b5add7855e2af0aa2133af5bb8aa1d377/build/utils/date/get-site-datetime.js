"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSiteDatetime = getSiteDatetime;
/**
 * External dependencies
 */
const date_1 = require("@wordpress/date");
function getSiteDatetime(value) {
    const datetime = (0, date_1.getDate)(value ?? null);
    return (0, date_1.date)('Y-m-d\\TH:i:s', datetime, undefined);
}
