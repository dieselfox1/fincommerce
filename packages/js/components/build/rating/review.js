"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReviewRating;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const index_1 = __importDefault(require("./index"));
/**
 * Display a set of stars representing the review's rating.
 */
function ReviewRating({ review, ...props }) {
    return (0, element_1.createElement)(index_1.default, { rating: review.rating || 0, ...props });
}
