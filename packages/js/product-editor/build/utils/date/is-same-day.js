"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSameDay = isSameDay;
function isSameDay(left, right) {
    return (left.getDate() === right.getDate() &&
        left.getMonth() === right.getMonth() &&
        left.getFullYear() === right.getFullYear());
}
