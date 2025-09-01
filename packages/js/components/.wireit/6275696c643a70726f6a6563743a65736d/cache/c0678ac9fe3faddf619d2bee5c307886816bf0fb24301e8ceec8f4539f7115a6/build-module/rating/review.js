/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
/**
 * Internal dependencies
 */
import Rating from './index';
/**
 * Display a set of stars representing the review's rating.
 */
export default function ReviewRating({ review, ...props }) {
    return createElement(Rating, { rating: review.rating || 0, ...props });
}
