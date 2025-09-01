"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const a11y_1 = require("@wordpress/a11y");
exports.default = {
    SPEAK(action) {
        (0, a11y_1.speak)(action.message, action.ariaLive || 'assertive');
    },
};
