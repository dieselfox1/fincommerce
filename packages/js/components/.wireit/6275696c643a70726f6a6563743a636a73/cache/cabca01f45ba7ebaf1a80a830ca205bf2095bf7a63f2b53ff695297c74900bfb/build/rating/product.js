"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProductRating;
/**
 * External dependencies
 */
const element_1 = require("@wordpress/element");
/**
 * Internal dependencies
 */
const index_1 = __importDefault(require("./index"));
/**
 * Display a set of stars representing the product's average rating.
 */
function ProductRating({ product, ...props }) {
    const rating = (product && product.average_rating) || 0;
    return (0, element_1.createElement)(index_1.default, { rating: rating, ...props });
}
