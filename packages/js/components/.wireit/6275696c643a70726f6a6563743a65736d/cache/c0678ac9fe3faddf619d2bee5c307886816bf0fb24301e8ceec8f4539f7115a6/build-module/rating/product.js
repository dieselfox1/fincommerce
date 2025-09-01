/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import Rating from './index';
/**
 * Display a set of stars representing the product's average rating.
 */
export default function ProductRating({ product, ...props }) {
    const rating = (product && product.average_rating) || 0;
    return createElement(Rating, { rating: rating, ...props });
}
