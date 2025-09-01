"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = truncate;
function truncate(value, length) {
    if (value.length > length) {
        return value.substring(0, length) + '…';
    }
    return value;
}
